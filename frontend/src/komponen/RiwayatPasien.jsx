import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api";

const RiwayatPasien = () => {
    const [patients, setPatients] = useState([]);
    const [dokter, setDokter] = useState(null);
    const [error, setError] = useState("");
    console.log("Data pasien dari backend:", patients);

    const loadDokterData = () => {
        const storedDokter = localStorage.getItem("dokter");
        if (storedDokter) {
            try {
                const parsedDokter = JSON.parse(storedDokter);
                if (!parsedDokter.id) throw new Error("ID dokter tidak ditemukan.");
                setDokter(parsedDokter);
                console.log("Dokter berhasil dimuat:", parsedDokter);
            } catch (error) {
                setError("Data dokter tidak valid. Silakan login ulang.");
            }
        } else {
            setError("Data dokter tidak ditemukan. Silakan login ulang.");
        }
    };

    const fetchPatients = async () => {
        if (!dokter) return;

        try {
            console.log("Mengambil data pasien dengan dokter ID:", dokter.id);
            const response = await axios.get(`/pasienss/riwayat/${dokter.id}`);
            console.log("Data pasien dari backend:", response.data); // Tambahkan log ini
            setPatients(response.data || []);
            setError("");
        } catch (err) {
            console.error("Error fetching patient data:", err.response || err.message);
            const errorMessage = err.response?.data?.error || "Gagal memuat riwayat pasien.";
            setError(errorMessage);
        }
    };

    useEffect(() => {
        loadDokterData();
    }, []);

    useEffect(() => {
        if (dokter) fetchPatients();
    }, [dokter]);

    const handleViewDetails = (patientId) => {
        window.location.href = `/dokter/${dokter.id}/riwayatpasien/detail/${patientId}`;
    };

    return (
        <div className="min-h-screen bg-gray-100 pl-60">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl mx-auto ">
            <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">Riwayat Pasien</h1>

            {error && <div className="bg-red-500 text-white p-3 rounded mb-4">{error}</div>}

            <div className="mb-6">
                <p>
                    Dokter Login: <span className="font-medium">{dokter?.nama || "Loading..."}</span>
                </p>
            </div>

            <div className="overflow-x-auto rounded-lg shadow-lg border">
                <table className="min-w-full bg-white text-gray-700">
                    <thead className="bg-blue-500 text-white uppercase text-sm">
                        <tr>
                            <th className="py-3 px-5 text-left">No</th>
                            <th className="py-3 px-5 text-left">Nama Pasien</th>
                            <th className="py-3 px-5 text-left hidden md:table-cell">Alamat</th>
                            <th className="py-3 px-5 text-left hidden md:table-cell">No. KTP</th>
                            <th className="py-3 px-5 text-left">No. HP</th>
                            <th className="py-3 px-5 text-left hidden md:table-cell">No. RM</th>
                            <th className="py-3 px-5 text-left">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.length > 0 ? (
                            patients.map((record, index) => (
                                <tr key={record.id} className={`hover:bg-gray-100 border-b ${index % 2 === 0 ? "bg-gray-50" : ""}`}>
                                    <td className="py-3 px-5">{index + 1}</td>
                                    <td className="py-3 px-5">{record.pasien.nama || "Tidak tersedia"}</td>
                                    <td className="py-3 px-5 hidden md:table-cell">{record.pasien.alamat || "N/A"}</td>
                                    <td className="py-3 px-5 hidden md:table-cell">{record.pasien.no_ktp || "N/A"}</td>
                                    <td className="py-3 px-5">{record.pasien.no_hp || "N/A"}</td>
                                    <td className="py-3 px-5 hidden md:table-cell">{record.pasien.no_rm || "N/A"}</td>
                                    <td className="py-3 px-5">
                                        <button
                                            className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                                            onClick={() => handleViewDetails(record.pasien.id)}
                                        >
                                            Detail
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-4 text-gray-500">
                                    Tidak ada data pasien
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
};

export default RiwayatPasien;