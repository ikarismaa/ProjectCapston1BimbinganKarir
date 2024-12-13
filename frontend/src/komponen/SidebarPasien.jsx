import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUser, FaClipboardList, FaHistory, FaSignOutAlt } from 'react-icons/fa';

const SidebarPasien = () => {
    return (
        <aside className="bg-blue-800 text-white w-64 h-screen p-10 fixed left-0 top-0 flex flex-col justify-between">
            <div>
                <h2 className="text-2xl text-center mb-6">Pasien Panel</h2>
                <ul>
                    <li className="mb-4 flex items-center">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `flex items-center w-full px-8 py-2 rounded ${
                                    isActive ? 'bg-blue-700' : 'hover:bg-blue-500'
                                }`
                            }
                        >
                            <FaHome className="h-5 w-5 mr-2" />
                            Dashboard
                        </NavLink>
                    </li>
                    <li className="mb-4 flex items-center">
                        <NavLink
                            to="/profilpasien"
                            className={({ isActive }) =>
                                `flex items-center w-full px-8 py-2 rounded ${
                                    isActive ? 'bg-blue-700' : 'hover:bg-blue-500'
                                }`
                            }
                        >
                            <FaUser className="h-5 w-5 mr-2" />
                            Profil
                        </NavLink>
                    </li>
                    <li className="mb-4 flex items-center">
                        <NavLink
                            to="/daftar-periksa"
                            className={({ isActive }) =>
                                `flex items-center w-full px-8 py-2 rounded ${
                                    isActive ? 'bg-blue-700' : 'hover:bg-blue-500'
                                }`
                            }
                        >
                            <FaClipboardList className="h-5 w-5 mr-2" />
                            Daftar Periksa
                        </NavLink>
                    </li>
                    <li className="mb-4 flex items-center">
                        <NavLink
                            to="/riwayat-periksa"
                            className={({ isActive }) =>
                                `flex items-center w-full px-8 py-2 rounded ${
                                    isActive ? 'bg-blue-700' : 'hover:bg-blue-500'
                                }`
                            }
                        >
                            <FaHistory className="h-5 w-5 mr-2" />
                            Riwayat Periksa
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="mt-auto">
                <button
                    onClick={() => alert('Logout berhasil!')} // Replace with actual logout functionality
                    className="flex items-center w-full px-8 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
                >
                    <FaSignOutAlt className="h-5 w-5 mr-2" />
                    <a href="/">Logout</a>
                </button>
            </div>
        </aside>
    );
};

export default SidebarPasien;