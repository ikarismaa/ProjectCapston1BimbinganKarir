<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Periksa;
use App\Models\DaftarPoli;
use App\Models\Dokter;
use App\Models\Pasien;



class RiwayatPasienController extends Controller
{

    public function index(Request $request, $id_dokter)
    {
        try {
            $daftarPoli = DaftarPoli::with(['pasien', 'jadwal'])
                ->whereHas('jadwal', function ($query) use ($id_dokter) {
                    $query->where('id_dokter', $id_dokter);
                })
                ->where('status', 'Sudah Diperiksa')
                ->get();

            if ($daftarPoli->isEmpty()) {
                return response()->json(['message' => 'Tidak ada riwayat pasien untuk dokter ini.'], 200);
            }

            return response()->json($daftarPoli, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Ambil detail pasien berdasarkan ID pasien (akses dokter).
     */
    public function detail($id_pasien, Request $request)
    {
        return $this->getDetail($id_pasien, null, $request->get('id_dokter'));
    }

    /**
     * Ambil detail riwayat pasien berdasarkan ID Daftar Poli (akses pasien).
     */
    public function detailByIdDaftarPoli(Request $request, $id_daftar_poli)
    {
        $id_pasien = $request->query('id_pasien');
        if (!$id_pasien) {
            return response()->json(['message' => 'ID pasien tidak diberikan.'], 400);
        }
        return $this->getDetail($id_pasien, $id_daftar_poli);
    }

    /**
     * Ambil detail pasien atau riwayat berdasarkan konteks.
     * Digunakan bersama oleh detail() dan detailByIdDaftarPoli().
     */
    private function getDetail($id_pasien, $id_daftar_poli = null, $id_dokter = null)
    {
        try {
            $query = Periksa::with([
                'daftarPoli.jadwal.dokter',
                'daftarPoli.jadwal.dokter.poli',
                'daftarPoli.pasien',
                'detailPeriksa.obat'
            ]);

            // Tambahkan filter berdasarkan konteks
            $query->whereHas('daftarPoli', function ($subQuery) use ($id_pasien, $id_daftar_poli, $id_dokter) {
                $subQuery->where('id_pasien', $id_pasien);
                if ($id_daftar_poli) {
                    $subQuery->where('id', $id_daftar_poli);
                }
                if ($id_dokter) {
                    $subQuery->whereHas('jadwal.dokter', function ($doctorQuery) use ($id_dokter) {
                        $doctorQuery->where('id', $id_dokter);
                    });
                }
            });

            // Ambil data terbaru
            $detail = $query->latest()->first();

            if (!$detail) {
                return response()->json(['message' => 'Data riwayat pasien tidak ditemukan.'], 404);
            }

            // Ambil data obat
            $obatList = $detail->detailPeriksa->map(function ($detailPeriksa) {
                return [
                    'nama_obat' => $detailPeriksa->obat->nama_obat ?? 'Tidak ada nama obat',
                    'harga' => $detailPeriksa->obat->harga ?? 0,
                ];
            });

            // Siapkan respons dengan data lengkap
            $response = [
                'nama' => $detail->daftarPoli->pasien->nama ?? 'Tidak ditemukan',
                'alamat' => $detail->daftarPoli->pasien->alamat ?? 'Tidak ditemukan',
                'no_ktp' => $detail->daftarPoli->pasien->no_ktp ?? 'Tidak ditemukan',
                'no_hp' => $detail->daftarPoli->pasien->no_hp ?? 'Tidak ditemukan',
                'keluhan' => $detail->daftarPoli->keluhan ?? 'Tidak ada keluhan',
                'tgl_periksa' => $detail->tgl_periksa ?? null,
                'catatan' => $detail->catatan,
                'poli' => $detail->daftarPoli->jadwal->dokter->poli->nama_poli ?? 'Tidak ditemukan',
                'dokter' => $detail->daftarPoli->jadwal->dokter->nama ?? 'Tidak ditemukan',
                'no_antrian' => $detail->daftarPoli->no_antrian ?? 'Tidak ditemukan',
                'obat' => $obatList->toArray(),
                'hari' => $detail->daftarPoli->jadwal->hari ?? 'N/A',
                'jam_mulai' => $detail->daftarPoli->jadwal->jam_mulai ?? 'N/A',
                'jam_selesai' => $detail->daftarPoli->jadwal->jam_selesai ?? 'N/A',
                'biaya_total' => $detail->biaya_periksa ?? 0,
            ];

            return response()->json($response, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan pada server.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
}
