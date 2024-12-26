import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUser, FaClipboardList, FaHistory, FaSignOutAlt } from "react-icons/fa";

const SidebarPasien = () => {
    // Ambil data pasien dari localStorage
    const patientData = JSON.parse(localStorage.getItem("pasien"));

    const patientId = patientData?.id || "default";

    // Daftar menu sidebar
    const menuItems = [
        // { name: "Dashboard", path: `/pasien/${patientId}/dashboard`, icon: <FaHome /> },
        { name: "Profil", path: `/pasien/${patientId}/dasboardpasien`, icon: <FaUser /> },
        { name: "Daftar Periksa", path: `/pasien/${patientId}/daftarperiksapasien`, icon: <FaClipboardList /> },
        // { name: "Riwayat Periksa", path: `/pasien/${patientId}/riwayat-periksa`, icon: <FaHistory /> },
    ];

    return (
        <div className="bg-blue-800 text-white w-64 h-screen p-10 fixed left-0 top-0 flex flex-col justify-between">
            {/* Header Sidebar */}
            <div className="py-4 px-6 text-center font-bold text-lg border-b border-blue-400">
                Pasien Panel
            </div>

            {/* Navigasi Menu */}
            <nav className="flex-grow mt-6">
                <ul className="space-y-4">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center px-6 py-2 rounded ${
                                        isActive
                                            ? "bg-blue-400 text-black"
                                            : "hover:bg-blue-500 hover:text-black"
                                    }`
                                }
                            >
                                <span className="mr-3">{item.icon}</span>
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Logout */}
            <div className="py-4 px-6 border-t border-blue-400">
                <NavLink
                    to="/"
                    className="flex items-center justify-center w-full py-2 bg-red-500 rounded text-white hover:bg-red-600"
                    onClick={() => localStorage.removeItem("pasien")} // Hapus data pasien saat logout
                >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                </NavLink>
            </div>
        </div>
    );
};

export default SidebarPasien;