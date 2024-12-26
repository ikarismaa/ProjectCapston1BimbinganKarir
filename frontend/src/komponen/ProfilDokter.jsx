import { useState, useEffect } from "react";
import axios from "axios";

const ProfilDokter = () => {
  const [profileData, setProfileData] = useState(null); // Data profil dokter
  const [isEditing, setIsEditing] = useState(false); // Mode edit

    useEffect(() => {
        const fetchProfile = async () => {
        try {
            // Ambil data dokter dari localStorage
            const storedDoctor = localStorage.getItem("dokter");
            if (!storedDoctor) {
            console.warn("No doctor data found in localStorage.");
            return;
            }

            const { id } = JSON.parse(storedDoctor); // Ambil ID dokter
            const response = await axios.get(`http://localhost:8000/api/dokters/${id}`);

            if (response.status === 200) {
            setProfileData(response.data); // Set data profil
            } else {
            console.warn("Failed to fetch profile data.");
            }
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
        };

        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = async () => {
        try {
        // Ambil data dokter dari localStorage
        const storedDoctor = localStorage.getItem("dokter");
        if (!storedDoctor) {
            console.warn("No doctor data found in localStorage.");
            return;
        }

        const { id } = JSON.parse(storedDoctor); // Ambil ID dokter
        await axios.put(`http://localhost:8000/api/dokters/${id}`, profileData);

        setIsEditing(false); // Keluar dari mode edit
        alert("Profil berhasil diperbarui.");
        } catch (error) {
        console.error("Error saving profile data:", error);
        alert("Gagal menyimpan perubahan.");
        }
    };

    if (!profileData) {
        return (
        <div className="text-center mt-6">
            <p className="text-red-500">Data dokter tidak tersedia. Pastikan Anda login sebagai dokter.</p>
        </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 pl-60">
            <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg relative">
                {/* Decorative Header */}
                <div className="absolute inset-x-0 top-0 -mt-8 mx-auto flex justify-center">
                    <div className="w-20 h-20 bg-blue-600 text-white flex items-center justify-center rounded-full shadow-lg">
                        <span className="text-2xl font-bold">Dr</span>
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-blue-700 mb-4 text-center mt-12">
                    Profil Dokter
                </h1>
                <p className="text-center text-gray-600 mb-8">
                    Kelola informasi profil Anda untuk membantu pasien mengenal Anda lebih baik.
                </p>
    
                <div className="space-y-6">
                    <div className="flex items-center">
                        <div className="w-32 text-gray-700 font-medium">Nama</div>
                        <div className="flex-1">
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="nama"
                                    value={profileData.nama}
                                    onChange={handleInputChange}
                                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            ) : (
                                <p className="mt-1 text-gray-900 text-lg">{profileData.nama}</p>
                            )}
                        </div>
                    </div>
    
                    <div className="flex items-center">
                        <div className="w-32 text-gray-700 font-medium">Alamat</div>
                        <div className="flex-1">
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="alamat"
                                    value={profileData.alamat}
                                    onChange={handleInputChange}
                                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            ) : (
                                <p className="mt-1 text-gray-900 text-lg">{profileData.alamat}</p>
                            )}
                        </div>
                    </div>
    
                    <div className="flex items-center">
                        <div className="w-32 text-gray-700 font-medium">No. HP</div>
                        <div className="flex-1">
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="no_hp"
                                    value={profileData.no_hp}
                                    onChange={handleInputChange}
                                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            ) : (
                                <p className="mt-1 text-gray-900 text-lg">{profileData.no_hp}</p>
                            )}
                        </div>
                    </div>
    
                    <div className="flex items-center">
                        <div className="w-32 text-gray-700 font-medium">Poli</div>
                        <div className="flex-1">
                            <p className="mt-1 text-gray-900 text-lg">
                                {profileData.poli ? profileData.poli.nama_poli : "Tidak ada data poli terkait"}
                            </p>
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
                    <p>© 2024 Doctor's Profile Management. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilDokter;
