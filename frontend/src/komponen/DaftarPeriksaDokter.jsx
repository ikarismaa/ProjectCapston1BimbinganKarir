import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

axios.defaults.baseURL = "http://localhost:8000/api";

const DaftarPeriksaDokter = () => {
    const [patientsData, setPatientsData] = useState([]);
    const [error, setError] = useState("");
    const [dokter, setDokter] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    // Fetch data dokter dari localStorage
    useEffect(() => {
        try {
            const storedDokter = localStorage.getItem("dokter");
            if (storedDokter) {
                setDokter(JSON.parse(storedDokter)); // Parse data JSON dokter
            } else {
                setError("Data dokter tidak ditemukan. Silakan login ulang.");
            }
        } catch (e) {
            console.error("Error loading dokter data:", e.message);
            setError("Gagal memuat data dokter.");
        }
    }, []);

    // Fetch patients data berdasarkan ID dokter
    useEffect(() => {
        const fetchPatients = async () => {
            if (dokter?.id) {
                try {
                    const params = selectedDate ? { tanggal: selectedDate } : {};
                    const response = await axios.get(`/periksa/${dokter.id}`, { params });
                    setPatientsData(response.data);
                } catch (err) {
                    console.error("Error fetching patients data:", err.message);
                    setError("Gagal memuat data pasien.");
                }
            }
        };

        fetchPatients();
    }, [dokter, selectedDate]);

    const handleCheck = (id) => {
        // Redirect ke halaman detail periksa dokter
        navigate(`/detailperiksadokter/${id}`);
    };

    const handleEdit = (id) => {
        // Logic for editing patient data
        navigate(`/detailperiksadokter/update/${id}`);
        console.log(`Edit data pasien dengan ID: ${id}`);
        // Redirect or perform action here
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value); // Update tanggal saat diubah
    };

    return (
        <div className="min-h-screen bg-gray-100 pl-60">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
                    Data Pasien Periksa
                </h1>

                {error && (
                    <div className="bg-red-500 text-white p-2 rounded mb-4 text-center">
                        {error}
                    </div>
                )}

                {/* Date Filter */}
                <div className="mb-4">
                    <label htmlFor="dateFilter" className="block text-sm font-medium text-gray-700">
                        Filter Tanggal:
                    </label>
                    <input
                        type="date"
                        id="dateFilter"
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Patient Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-blue-100 text-gray-700">
                                <th className="border border-gray-300 px-4 py-2">No</th>
                                <th className="border border-gray-300 px-4 py-2">No Antrian</th>
                                <th className="border border-gray-300 px-4 py-2">Nama</th>
                                <th className="border border-gray-300 px-4 py-2">Keluhan</th>
                                <th className="border border-gray-300 px-4 py-2">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patientsData.length > 0 ? (
                                patientsData.map((patient, index) => (
                                    <tr
                                        key={patient.id}
                                        className={`${
                                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        }`}
                                    >
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {index + 1}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {patient.no_antrian}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {patient.nama_pasien}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {patient.keluhan}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {patient.status === "Belum Diperiksa" ? (
                                                <button
                                                    onClick={() => handleCheck(patient.id)}
                                                    className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                                >
                                                    Periksa
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleEdit(patient.id)}
                                                    className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                                                >
                                                    Edit
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                                    >
                                        Tidak ada data pasien.
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

export default DaftarPeriksaDokter;
