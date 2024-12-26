import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaUser, FaNotesMedical, FaCalendarAlt, FaClock, FaPills, FaMoneyBillWave } from "react-icons/fa";

const DetailRiwayatPasien = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { idPasien, idDaftarPoli } = useParams();

    useEffect(() => {
        const storedPasien = localStorage.getItem("pasien");
        const parsedPasien = storedPasien ? JSON.parse(storedPasien) : null;

        if (!idDaftarPoli || !parsedPasien?.id) {
            setError("ID daftar poli atau ID pasien tidak ditemukan.");
            setLoading(false);
            return;
        }

        axios
            .get(`/detail-riwayat-pasien/${idDaftarPoli}`, { params: { id_pasien: parsedPasien.id } })
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.response?.data?.message || "Terjadi kesalahan pada server.");
                setLoading(false);
            });
    }, [idDaftarPoli]);

    if (loading) return <div className="flex items-center justify-center min-h-screen text-lg">Loading...</div>;
    if (error) return <div className="flex items-center justify-center min-h-screen text-red-500 text-lg">{error}</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 pl-60">
            <div className="bg-white shadow-xl rounded-lg max-w-4xl mx-auto p-8">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Detail Riwayat Pasien</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Informasi Pasien */}
                    <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold text-blue-500 flex items-center">
                            <FaUser className="mr-2" /> Informasi Pasien
                        </h2>
                        <ul className="mt-4 text-gray-700 space-y-2">
                            <li><strong>Nama Pasien:</strong> {data.nama}</li>
                            <li><strong>Keluhan:</strong> {data.keluhan}</li>
                            <li><strong>Poli:</strong> {data.poli}</li>
                            <li><strong>Dokter:</strong> {data.dokter}</li>
                        </ul>
                    </div>

                    {/* Jadwal Pemeriksaan */}
                    <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold text-blue-500 flex items-center">
                            <FaCalendarAlt className="mr-2" /> Jadwal Pemeriksaan
                        </h2>
                        <ul className="mt-4 text-gray-700 space-y-2">
                            <li><strong>Hari:</strong> {data.hari}</li>
                            <li><strong>Jam Mulai:</strong> {data.jam_mulai}</li>
                            <li><strong>Jam Selesai:</strong> {data.jam_selesai}</li>
                            <li><strong>Tanggal Periksa:</strong> {data.tgl_periksa}</li>
                        </ul>
                    </div>
                </div>

                {/* Obat dan Biaya */}
                <div className="bg-gray-100 p-4 rounded-lg shadow-sm mt-6">
                    <h2 className="text-xl font-semibold text-blue-500 flex items-center">
                        <FaPills className="mr-2" /> Informasi Obat
                    </h2>
                    <ul className="mt-4 space-y-2">
                        {data.obat.map((obat, idx) => (
                            <li key={idx} className="flex justify-between text-gray-700">
                                <span>{obat.nama_obat}</span>
                                <span>Rp {obat.harga.toLocaleString()}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg shadow-sm mt-6">
                    <h2 className="text-xl font-semibold text-blue-500 flex items-center">
                        <FaMoneyBillWave className="mr-2" /> Biaya Pemeriksaan
                    </h2>
                    <p className="text-gray-700 text-lg mt-2">
                        Total Biaya Obat: <strong>Rp {data.biaya_total.toLocaleString()}</strong>
                    </p>
                </div>

                {/* Catatan */}
                <div className="bg-gray-100 p-4 rounded-lg shadow-sm mt-6">
                    <h2 className="text-xl font-semibold text-blue-500 flex items-center">
                        <FaNotesMedical className="mr-2" /> Catatan
                    </h2>
                    <p className="text-gray-700 mt-2">{data.catatan || "Tidak ada catatan tambahan."}</p>
                </div>

                {/* Tombol Kembali */}
                <div className="text-center mt-8">
                    <button
                        onClick={() => window.history.back()}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Kembali
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailRiwayatPasien;
