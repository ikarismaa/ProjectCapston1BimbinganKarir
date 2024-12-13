import React, { useState, useEffect } from "react";
import axios from "axios";

const Dokter = () => {
    const [dokters, setDokters] = useState([]);
    const [polis, setPolis] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [formData, setFormData] = useState({
        id: null,
        nama: "",
        alamat: "",
        no_hp: "",
        id_poli: "",
    });

    const fetchDokters = async () => {
        try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:8000/api/dokters");
        setDokters(response.data);
        } catch (error) {
        setErrorMessage("Gagal mengambil data dokter. Coba lagi nanti.");
        console.error("Error fetching dokters:", error);
        } finally {
        setIsLoading(false);
        }
    };

    const fetchPolis = async () => {
        try {
        const response = await axios.get("http://localhost:8000/api/polis");
        setPolis(response.data);
        } catch (error) {
        console.error("Error fetching polis:", error);
        }
    };

    useEffect(() => {
        fetchDokters();
        fetchPolis();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        if (!formData.nama || !formData.alamat || !formData.no_hp || !formData.id_poli) {
        setErrorMessage("Semua field wajib diisi.");
        return false;
        }
        if (isNaN(formData.no_hp)) {
        setErrorMessage("Nomor HP harus berupa angka.");
        return false;
        }
        return true;
    };

    const handleAddPopup = () => {
        setIsEditMode(false);
        setFormData({ nama: "", alamat: "", no_hp: "", id_poli: "" });
        setErrorMessage("");
        setIsPopupOpen(true);
    };

    const handleEditPopup = (dokter) => {
        setIsEditMode(true);
        setEditId(dokter.id);
        setFormData({
        nama: dokter.nama,
        alamat: dokter.alamat,
        no_hp: dokter.no_hp,
        id_poli: dokter.id_poli,
        });
        setErrorMessage("");
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setFormData({ nama: "", alamat: "", no_hp: "", id_poli: "" });
        setErrorMessage("");
        setEditId(null);
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        try {
        setIsLoading(true);
        if (isEditMode) {
            await axios.put(`http://localhost:8000/api/dokters/${editId}`, formData);
        } else {
            await axios.post("http://localhost:8000/api/dokters", formData);
        }
        fetchDokters();
        handleClosePopup();
        } catch (error) {
        setErrorMessage("Gagal menyimpan data dokter. Coba lagi nanti.");
        console.error("Error saving dokter:", error);
        } finally {
        setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
        setIsLoading(true);
        await axios.delete(`http://localhost:8000/api/dokters/${id}`);
        fetchDokters();
        } catch (error) {
        setErrorMessage("Gagal menghapus dokter. Coba lagi nanti.");
        console.error("Error deleting dokter:", error);
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <>
        <div className="p-10 bg-gray-100 min-h-screen pl-60">
        <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">CRUD Tabel Dokter</h1>
            <button
            onClick={handleAddPopup}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
            >
            Tambah Dokter
            </button>
            {errorMessage && (
            <p className="text-red-500 mb-4">{errorMessage}</p>
            )}
            <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-gray-200">
                <th className="border p-2">Nama</th>
                <th className="border p-2">Alamat</th>
                <th className="border p-2">Nomor HP</th>
                <th className="border p-2">Poli</th>
                <th className="border p-2">Aksi</th>
                </tr>
            </thead>
            <tbody>
                {dokters.map((dokter) => (
                <tr key={dokter.id} className="hover:bg-gray-100">
                    <td className="border p-2">{dokter.nama}</td>
                    <td className="border p-2">{dokter.alamat}</td>
                    <td className="border p-2">{dokter.no_hp}</td>
                    <td className="border p-2">
                    {polis.find((poli) => poli.id === dokter.id_poli)?.nama_poli || "N/A"}
                    </td>
                    <td className="border p-2">
                    <button
                        onClick={() => handleEditPopup(dokter)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(dokter.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                        Hapus
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        {/* Popup Form */}
        {isPopupOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-96 p-6 rounded shadow-lg">
                <h2 className="text-xl font-bold mb-4">
                {isEditMode ? "Edit Data Dokter" : "Tambah Data Dokter"}
                </h2>
                <div className="mb-4">
                <label className="block text-gray-700">Nama:</label>
                <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                />
                </div>
                <div className="mb-4">
                <label className="block text-gray-700">Alamat:</label>
                <input
                    type="text"
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                />
                </div>
                <div className="mb-4">
                <label className="block text-gray-700">Nomor HP:</label>
                <input
                    type="text"
                    name="no_hp"
                    value={formData.no_hp}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                />
                </div>
                <div className="mb-4">
                <label className="block text-gray-700">Poli:</label>
                <select
                    name="id_poli"
                    value={formData.id_poli}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                >
                    <option value="" disabled>
                    Pilih Poli
                    </option>
                    {polis.map((poli) => (
                    <option key={poli.id} value={poli.id}>
                        {poli.nama_poli}
                    </option>
                    ))}
                </select>
                </div>
                <div className="flex justify-end">
                <button
                    onClick={handleClosePopup}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                >
                    Batal
                </button>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Simpan
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
        </>
    );
};

export default Dokter;
