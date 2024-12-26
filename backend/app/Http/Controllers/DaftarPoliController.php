<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DaftarPoli;
use App\Models\Poli;
use App\Models\JadwalPeriksa;
use Illuminate\Support\Facades\Log;

class DaftarPoliController extends Controller
{
    /**
     * Ambil daftar poli.
     */
    public function getPolis()
    {
        try {
            $polis = Poli::all();
            return response()->json($polis, 200);
        } catch (\Exception $e) {
            Log::error('Error fetching polis:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'message' => 'Terjadi kesalahan saat memuat daftar poli.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mengambil jadwal berdasarkan poli.
     */
    public function getJadwalByPoli($id_poli)
    {
        try {
            $jadwals = JadwalPeriksa::where('status', 'aktif')
                ->whereHas('dokter', function ($query) use ($id_poli) {
                    $query->where('id_poli', $id_poli);
                })
                ->with('dokter')
                ->get();

            if ($jadwals->isEmpty()) {
                return response()->json([
                    'message' => 'Tidak ada jadwal aktif untuk poli ini.'
                ], 404);
            }

            return response()->json($jadwals, 200);
        } catch (\Exception $e) {
            Log::error('Error fetching jadwals:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'message' => 'Terjadi kesalahan saat memuat jadwal.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Simpan data pendaftaran poli.
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'id_jadwal' => 'required|exists:jadwal_periksa,id',
                'keluhan' => 'required|string|max:255',
                'id_pasien' => 'required|exists:pasien,id',
            ]);

            $hariIni = now()->toDateString();
            $jumlahAntrian = DaftarPoli::where('id_jadwal', $validatedData['id_jadwal'])
                ->whereDate('created_at', $hariIni)
                ->count();

            $validatedData['no_antrian'] = $jumlahAntrian + 1;

            // Set status default menjadi "Belum Diperiksa"
            $validatedData['status'] = "Belum Diperiksa";

            $daftarPoli = DaftarPoli::create($validatedData);

            return response()->json([
                'message' => 'Pendaftaran berhasil!',
                'data' => $daftarPoli,
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error saving Daftar Poli:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'message' => 'Terjadi kesalahan saat menyimpan data.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Ambil riwayat daftar poli berdasarkan pasien.
     */
    public function riwayatPasien($id_pasien)
    {
        try {
            $riwayat = DaftarPoli::where('id_pasien', $id_pasien)
                ->with(['jadwal.dokter.poli']) // Tambahkan relasi lengkap
                ->get()
                ->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'Poli' => optional($item->jadwal->dokter->poli)->nama_poli ?? 'N/A',
                        'Dokter' => optional($item->jadwal->dokter)->nama ?? 'N/A',
                        'Hari' => $item->jadwal->hari ?? 'N/A',
                        'Mulai' => $item->jadwal->jam_mulai ?? 'N/A',
                        'Selesai' => $item->jadwal->jam_selesai ?? 'N/A',
                        'Antrian' => $item->no_antrian,
                        'Status' => $item->status === 'Sudah Diperiksa' ? 'Sudah Diperiksa' : 'Belum Diperiksa',
                    ];
                });

            return response()->json($riwayat, 200);
        } catch (\Exception $e) {
            Log::error('Error fetching riwayat:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'message' => 'Terjadi kesalahan pada server.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update status menjadi sudah diperiksa.
     */
    public function updateStatus(Request $request, $id)
    {
        try {
            // Cari entri DaftarPoli berdasarkan ID
            $daftarPoli = DaftarPoli::findOrFail($id);

            // Perbarui status menjadi sudah diperiksa
            $daftarPoli->status = "Sudah Diperiksa";
            $daftarPoli->save();

            return response()->json([
                'message' => 'Status berhasil diperbarui menjadi sudah diperiksa.',
                'data' => $daftarPoli,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error updating status:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'message' => 'Terjadi kesalahan saat memperbarui status.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


}
