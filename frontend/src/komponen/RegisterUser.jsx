import { useState } from "react";
import axios from "axios";
import registerUserImage from "../assets/rs.jpg";

const RegisterUser = () => {
    const [formData, setFormData] = useState({
        id: null,
        nama: "",
        alamat: "",
        no_ktp: "",
        no_hp: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const [successData, setSuccessData] = useState(null); // Menyimpan data pasien yang berhasil didaftarkan
    const [showModal, setShowModal] = useState(false); // Menampilkan modal

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const response = await axios.post("http://localhost:8000/api/register", formData);

        if (response.status === 201) {
            setMessage("Registrasi berhasil!");
            setSuccessData(response.data.pasien); // Menyimpan data pasien
            setShowModal(true); // Menampilkan modal pop-up
        } else {
            setMessage(response.data.message || "Registrasi gagal.");
        }
        } catch (error) {
        console.error("Error submitting form:", error);
        setMessage(
            error.response?.data?.message || "Terjadi kesalahan saat mengirim formulir."
        );
        }
    };

    return (
        <div
        className="min-h-screen flex items-center justify-center px-4 py-10"
            style={{
                backgroundImage: `url(${registerUserImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                backgroundBlendMode: "darken",
            }}
        >
        <div className="w-6/12 bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">
            Registrasi
            </h2>
            {message && (
            <p
                className={`text-center mt-4 ${
                message.includes("berhasil") ? "text-green-600" : "text-red-600"
                }`}
            >
                {message}
            </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
                Nama
                </label>
                <input
                type="text"
                id="nama"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan nama Anda"
                required
                />
            </div>
            <div>
                <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">
                Alamat
                </label>
                <input
                type="text"
                id="alamat"
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan alamat Anda"
                required
                />
            </div>
            <div>
                <label htmlFor="no_ktp" className="block text-sm font-medium text-gray-700">
                No KTP
                </label>
                <input
                type="text"
                id="no_ktp"
                name="no_ktp"
                value={formData.no_ktp}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan nomor KTP Anda"
                required
                />
            </div>
            <div>
                <label htmlFor="no_hp" className="block text-sm font-medium text-gray-700">
                No HP
                </label>
                <input
                type="text"
                id="no_hp"
                name="no_hp"
                value={formData.no_hp}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan nomor HP Anda"
                required
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
                </label>
                <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan password Anda"
                required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transform transition duration-300 hover:scale-105"
            >
                Daftar
            </button>
            </form>
            <p className="text-center text-gray-600 mt-6">
            Sudah Mempunyai Akun?{' '}
            <a
                href="/loginuser"
                className="text-blue-600 font-medium hover:underline"
                >
                Klik di sini untuk Login
            </a>
            </p>
        </div>

        {/* Modal */}
        {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold text-green-600 mb-4 text-center">
                            Registrasi Berhasil!
                        </h3>
                        {successData && (
                            <div className="text-center">
                                <p><strong>Nomor Rekam Medis:</strong> {successData.no_rm}</p>
                                <p>Nama: {successData.nama}</p>
                                <p>Alamat: {successData.alamat}</p>
                            </div>
                        )}
                        <button
                            onClick={() => (window.location.href = "/loginuser")}
                            className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Menuju Halaman Login
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegisterUser;