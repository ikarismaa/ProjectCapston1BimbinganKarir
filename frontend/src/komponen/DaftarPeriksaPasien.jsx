import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:8000/api";

const DaftarPeriksaPasien = () => {
    const [polis, setPolis] = useState([]);
    const [jadwals, setJadwals] = useState([]);
    const [formData, setFormData] = useState({
        id_poli: "",
        id_jadwal: "",
        keluhan: "",
    });
    const [pasien, setPasien] = useState(null);
    const [riwayat, setRiwayat] = useState([]); // State untuk riwayat daftar poli
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [popupMessage, setPopupMessage] = useState(""); // Pesan popup
    const [showPopup, setShowPopup] = useState(false);    // Kontrol tampilan popup

    // Load patient data from localStorage
    useEffect(() => {
        try {
            const storedPasien = localStorage.getItem("pasien");
            if (storedPasien) {
                const pasienData = JSON.parse(storedPasien);
                setPasien(pasienData);
                fetchRiwayat(pasienData.id);
            } else {
                setError("Data pasien tidak ditemukan. Silakan login ulang.");
            }
        } catch (e) {
            console.error("Error loading pasien data:", e.message);
            setError("Gagal memuat data pasien.");
        }
    }, []);

    // Load patient data from localStorage
    useEffect(() => {
        try {
            const storedPasien = localStorage.getItem("pasien");
            if (storedPasien) {
                const pasienData = JSON.parse(storedPasien);
                setPasien(pasienData);

                // Fetch riwayat daftar poli setelah pasien dimuat
                fetchRiwayat(pasienData.id);
            } else {
                setError("Data pasien tidak ditemukan. Silakan login ulang.");
            }
        } catch (e) {
            console.error("Error loading pasien data:", e.message);
            setError("Gagal memuat data pasien.");
        }
    }, []);

    // Fetch poli list on component mount
    useEffect(() => {
        axios
            .get("/polis")
            .then((response) => setPolis(response.data))
            .catch((error) => {
                console.error("Error fetching polis:", error.message);
                setError("Gagal memuat daftar poli.");
            });
    }, []);

    // Fetch riwayat daftar poli
    const fetchRiwayat = (id_pasien) => {
        axios
            .get(`/riwayat-pasien/${id_pasien}`)
            .then((response) => setRiwayat(response.data))
            .catch((error) => {
                console.error("Error fetching riwayat:", error.message);
                setError("Gagal memuat riwayat daftar poli.");
            });
    };

    // Handle changes in poli selection and fetch schedules
    const handlePoliChange = (e) => {
        const id_poli = e.target.value;
        setFormData((prev) => ({ ...prev, id_poli, id_jadwal: "" }));
    
        if (id_poli) {
            axios
                .get(`/jadwalperiksa/poli/${id_poli}`)
                .then((response) => {
                    if (response.data.length === 0) {
                        // Jika jadwal kosong, tampilkan popup
                        setPopupMessage("Belum ada jadwal di poli tersebut.");
                        setShowPopup(true);
                    }
                    setJadwals(response.data); // Tetap set jadwal, meskipun kosong
                })
                .catch((error) => {
                    if (error.response && error.response.status === 404) {
                        // Tangani 404 khusus: tidak ada jadwal ditemukan
                        setPopupMessage("Belum ada jadwal di poli tersebut.");
                        setShowPopup(true);
                    } else {
                        // Error lainnya
                        console.error("Error fetching jadwal:", error.message);
                        setPopupMessage("Terjadi kesalahan saat memuat jadwal.");
                        setShowPopup(true);
                    }
                    setJadwals([]); // Reset jadwals ke array kosong
                });
        } else {
            setJadwals([]); // Reset jadwal jika poli tidak dipilih
        }
    };
    
    const handleClosePopup = () => {
        setShowPopup(false);
        setPopupMessage("");
    };

    const updateStatus = (id) => {
        axios
            .post(`/update-status/${id}`)
            .then(() => {
                setMessage("Status berhasil diperbarui!");
                fetchRiwayat(pasien.id); // Refresh riwayat
            })
            .catch((error) => {
                console.error("Error updating status:", error.message);
                setError("Gagal memperbarui status.");
            });
    };
    

    // Handle form field changes
    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Submit the form
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors
        setMessage(""); // Clear previous success message

        if (!formData.id_poli || !formData.id_jadwal || !formData.keluhan) {
            setError("Harap isi semua kolom yang diperlukan.");
            return;
        }

        const dataToSend = { ...formData, id_pasien: pasien?.id };

        axios
            .post("/daftar-poli", dataToSend)
            .then(() => {
                setMessage("Pendaftaran berhasil!");
                setFormData({ id_poli: "", id_jadwal: "", keluhan: "" });
                setJadwals([]);

                // Refresh riwayat setelah pendaftaran berhasil
                fetchRiwayat(pasien.id);
            })
            .catch((error) => {
                console.error("Error submitting pendaftaran:", error.response?.data || error.message);
                setError(
                    error.response?.data?.message || "Gagal mendaftarkan poli. Silakan coba lagi."
                );
            });
    };

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Pendaftaran Poli</h1>
            {error && <div className="bg-red-500 text-white p-2 mb-4">{error}</div>}
            {message && <div className="bg-green-500 text-white p-2 mb-4">{message}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">No Rekam Medis</label>
                    <input
                        type="text"
                        value={pasien?.no_rm || ""}
                        readOnly
                        className="w-full border rounded p-2 bg-gray-100"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Pilih Poli</label>
                    <select
                        name="id_poli"
                        value={formData.id_poli}
                        onChange={handlePoliChange}
                        className="w-full border rounded p-2"
                        required
                    >
                        <option value="">-- Pilih Poli --</option>
                        {polis.map((poli) => (
                            <option key={poli.id} value={poli.id}>
                                {poli.nama_poli}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Pilih Jadwal</label>
                    <select
                        name="id_jadwal"
                        value={formData.id_jadwal}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    >
                        <option value="">-- Pilih Jadwal --</option>
                        {jadwals.map((jadwal) => (
                            <option key={jadwal.id} value={jadwal.id}>
                                {jadwal.hari} ({jadwal.jam_mulai} - {jadwal.jam_selesai})
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Keluhan</label>
                    <textarea
                        name="keluhan"
                        value={formData.keluhan}
                        onChange={handleChange}
                        rows="4"
                        className="w-full border rounded p-2"
                        placeholder="Tuliskan keluhan Anda"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Daftar Poli
                </button>
            </form>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow">
                        <p className="mb-4">{popupMessage}</p>
                        <button
                            onClick={handleClosePopup}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            )}

            <h2 className="text-xl font-bold mt-8 mb-4">Riwayat Daftar Poli</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">No</th>
                        <th className="border px-4 py-2">Poli</th>
                        <th className="border px-4 py-2">Dokter</th>
                        <th className="border px-4 py-2">Hari</th>
                        <th className="border px-4 py-2">Jam Mulai</th>
                        <th className="border px-4 py-2">Jam Selesai</th>
                        <th className="border px-4 py-2">Antrian</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {riwayat.length > 0 ? (
                        riwayat.map((item, index) => (
                            <tr key={item.id}>
                                <td className="border px-4 py-2 text-center">{index + 1}</td>
                                <td className="border px-4 py-2">{item.Poli}</td>
                                <td className="border px-4 py-2">{item.Dokter}</td>
                                <td className="border px-4 py-2">{item.Hari}</td>
                                <td className="border px-4 py-2">{item.Mulai}</td>
                                <td className="border px-4 py-2">{item.Selesai}</td>
                                <td className="border px-4 py-2 text-center">{item.Antrian}</td>
                                <td className="border px-4 py-2">{item.Status}</td>
                                <td className="border px-4 py-2 text-center">
                                    {item.Status === "Sudah Diperiksa" ? (
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                            onClick={() => navigate(`/pasien/${pasien?.id}/riwayat-periksa/detail/${item.id}`)}
                                        >
                                            Detail
                                        </button>
                                    ) : (
                                        <button
                                            className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
                                            disabled
                                        >
                                            Belum Diperiksa
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="border px-4 py-2 text-center text-gray-500">
                                Tidak ada riwayat.
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>
        </div>
    );
};

export default DaftarPeriksaPasien;
