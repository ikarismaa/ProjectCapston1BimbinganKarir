import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilPasien = () => {
    const [userData, setUserData] = useState(null); // Data profil pasien
    const [isEditing, setIsEditing] = useState(false); // Mode edit
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Ambil data pasien dari localStorage
                const storedUser = localStorage.getItem("pasien");
                if (storedUser) {
                    const user = JSON.parse(storedUser);
                    const response = await axios.get(
                        `http://localhost:8000/api/pasien/${user.id}`
                    );
                    setUserData(response.data); // Set data pasien
                } else {
                    navigate("/login"); // Redirect jika tidak ada data pasien
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                navigate("/login");
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = async () => {
        try {
            // Ambil data pasien dari localStorage
            const storedUser = localStorage.getItem("pasien");
            if (!storedUser) {
                console.warn("No patient data found in localStorage.");
                return;
            }

            const { id } = JSON.parse(storedUser); // Ambil ID pasien
            await axios.put(`http://localhost:8000/api/pasien/${id}`, userData);

            setIsEditing(false); // Keluar dari mode edit
            alert("Profil berhasil diperbarui.");
        } catch (error) {
            console.error("Error saving profile data:", error);
            alert("Gagal menyimpan perubahan.");
        }
    };

    if (!userData) {
        return (
            <div className="text-center mt-6">
                <p className="text-red-500">Data pasien tidak tersedia. Pastikan Anda login sebagai pasien.</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 pl-60">
            <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg relative">
                {/* Decorative Header */}
                <div className="absolute inset-x-0 top-0 -mt-8 mx-auto flex justify-center">
                    <div className="w-20 h-20 bg-blue-600 text-white flex items-center justify-center rounded-full shadow-lg">
                        <span className="text-2xl font-bold">Ps</span>
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-blue-700 mb-4 text-center mt-12">
                    Profil Pasien
                </h1>
                <p className="text-center text-gray-600 mb-8">
                    Kelola informasi profil Anda untuk akses layanan yang lebih baik.
                </p>

                <div className="space-y-6">
                    <div className="flex items-center">
                        <div className="w-32 text-gray-700 font-medium">Nama</div>
                        <div className="flex-1">
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="nama"
                                    value={userData.nama}
                                    onChange={handleInputChange}
                                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            ) : (
                                <p className="mt-1 text-gray-900 text-lg">{userData.nama}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="w-32 text-gray-700 font-medium">No KTP</div>
                        <div className="flex-1">
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="no_ktp"
                                    value={userData.no_ktp}
                                    onChange={handleInputChange}
                                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            ) : (
                                <p className="mt-1 text-gray-900 text-lg">{userData.no_ktp}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="w-32 text-gray-700 font-medium">No HP</div>
                        <div className="flex-1">
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="no_hp"
                                    value={userData.no_hp}
                                    onChange={handleInputChange}
                                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            ) : (
                                <p className="mt-1 text-gray-900 text-lg">{userData.no_hp}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="w-32 text-gray-700 font-medium">No RM</div>
                        <div className="flex-1">
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="no_rm"
                                    value={userData.no_rm}
                                    onChange={handleInputChange}
                                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            ) : (
                                <p className="mt-1 text-gray-900 text-lg">{userData.no_rm}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex justify-center space-x-4">
                    {isEditing ? (
                        <>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                            >
                                Simpan
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                        >
                            Edit Profil
                        </button>
                    )}
                </div>

                {/* Footer Decorative Element */}
                <div className="mt-10 text-center text-gray-500 text-sm">
                    <p>© 2024 Patient Profile Management. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilPasien;