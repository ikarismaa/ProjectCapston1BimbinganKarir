import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUserMd, FaUsers, FaHospital, FaPills, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <>
            <aside className="bg-blue-800 text-white w-64 h-screen p-10 fixed left-0 top-0 flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl text-center mb-6">Admin Panel</h2>
                    <ul>
                        <li className="mb-4 flex items-center">
                            <NavLink
                                to="/DasboardAdmin"
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
                                to="/dokter"
                                className={({ isActive }) =>
                                    `flex items-center w-full px-8 py-2 rounded ${
                                        isActive ? 'bg-blue-700' : 'hover:bg-blue-500'
                                    }`
                                }
                            >
                                <FaUserMd className="h-5 w-5 mr-2" />
                                Dokter
                            </NavLink>
                        </li>
                        <li className="mb-4 flex items-center">
                            <NavLink
                                to="/pasien"
                                className={({ isActive }) =>
                                    `flex items-center w-full px-8 py-2 rounded ${
                                        isActive ? 'bg-blue-700' : 'hover:bg-blue-500'
                                    }`
                                }
                            >
                                <FaUsers className="h-5 w-5 mr-2" />
                                Pasien
                            </NavLink>
                        </li>
                        <li className="mb-4 flex items-center">
                            <NavLink
                                to="/poli"
                                className={({ isActive }) =>
                                    `flex items-center w-full px-8 py-2 rounded ${
                                        isActive ? 'bg-blue-700' : 'hover:bg-blue-500'
                                    }`
                                }
                            >
                                <FaHospital className="h-5 w-5 mr-2" />
                                Poli
                            </NavLink>
                        </li>
                        <li className="mb-4 flex items-center">
                            <NavLink
                                to="/obat"
                                className={({ isActive }) =>
                                    `flex items-center w-full px-8 py-2 rounded ${
                                        isActive ? 'bg-blue-700' : 'hover:bg-blue-500'
                                    }`
                                }
                            >
                                <FaPills className="h-5 w-5 mr-2" />
                                Obat
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
        </>
    );
};

export default Sidebar;
