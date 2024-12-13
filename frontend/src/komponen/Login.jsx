import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import hospitalImage from "../assets/rs.jpg";

const Login = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [formData, setFormData] = useState({
        role: "admin",
        username_or_name: "",
        password_or_no_hp: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await axios.post("http://localhost:8000/api/login", formData, {
                headers: { Accept: "application/json" },
            });

            if (response.status === 200 && response.data.user) {
                setUserDetails(response.data.user);
                setMessage(`Login berhasil! Selamat datang, ${response.data.user.nama || response.data.user.username}`);

                if (formData.role === "admin") {
                    navigate(`/DasboardAdmin`);
                } else if (formData.role === "dokter") {
                    localStorage.setItem("dokter", JSON.stringify(response.data.user));
                    console.log("Data dokter disimpan:", response.data.user);
                    navigate(`/dasboarddokter/${response.data.user.id}`);
                }
            } else {
                setMessage("Login gagal atau data tidak ditemukan.");
            }
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message || "Login gagal.");
            } else {
                setMessage("Tidak dapat terhubung ke server.");
            }
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4 py-10"
            style={{
                backgroundImage: `url(${hospitalImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                backgroundBlendMode: "darken",
            }}
        >
            <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-6 md:p-8">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">Login</h2>
                {message && (
                    <p className={`text-center mt-4 ${message.includes("berhasil") ? "text-green-600" : "text-red-600"}`}>
                        {message}
                    </p>
                )}
                {userDetails && (
                    <div className="text-center mt-4 bg-green-100 border border-green-500 p-4 rounded">
                        <p>
                            <strong>Role:</strong> {formData.role}
                        </p>
                        <p>
                            <strong>Nama/Username:</strong> {userDetails.nama || userDetails.username}
                        </p>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                            Role
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="admin">Admin</option>
                            <option value="dokter">Dokter</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="username_or_name" className="block text-sm font-medium text-gray-700">
                            {formData.role === "admin" ? "Username" : "Nama"}
                        </label>
                        <input
                            type="text"
                            id="username_or_name"
                            name="username_or_name"
                            value={formData.username_or_name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder={`Masukkan ${formData.role === "admin" ? "username" : "nama"} Anda`}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password_or_no_hp" className="block text-sm font-medium text-gray-700">
                            {formData.role === "admin" ? "Password" : "No HP"}
                        </label>
                        <input
                            type={formData.role === "admin" ? "password" : "text"}
                            id="password_or_no_hp"
                            name="password_or_no_hp"
                            value={formData.password_or_no_hp}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder={`Masukkan ${formData.role === "admin" ? "password" : "no HP"} Anda`}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transform transition duration-300 hover:scale-105"
                    >
                        Masuk
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
