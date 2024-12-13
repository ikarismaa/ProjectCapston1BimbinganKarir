// Path: components/DoctorSidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaCalendarAlt, FaUserInjured, FaSignOutAlt } from 'react-icons/fa';

const SidebarDokter = () => {
    return (
        <div className="bg-blue-800 text-white w-64 h-screen p-10 fixed left-0 top-0 flex flex-col justify-between">
            <div className="py-4 px-6 text-center font-bold text-lg border-b border-blue-400">
                Doctor's Panel
            </div>
            <nav className="flex-grow mt-6">
                <ul className="space-y-4">
                    <li>
                        <Link 
                            to="/dashboard" 
                            className="flex items-center px-6 py-2 rounded hover:bg-blue-500"
                        >
                            <FaTachometerAlt className="mr-3" />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/profiledokter" 
                            className="flex items-center px-6 py-2 rounded hover:bg-blue-500"
                        >
                            <FaUser className="mr-3" />
                            Profil
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/schedule" 
                            className="flex items-center px-6 py-2 rounded hover:bg-blue-500"
                        >
                            <FaCalendarAlt className="mr-3" />
                            Input Jadwal
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/patients" 
                            className="flex items-center px-6 py-2 rounded hover:bg-blue-500"
                        >
                            <FaUserInjured className="mr-3" />
                            Data Pasien Periksa
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="py-4 px-6 border-t border-blue-400">
                <button className="flex items-center justify-center w-full py-2 bg-red-500 rounded text-white hover:bg-red-600">
                    <FaSignOutAlt className="mr-2" />
                    <a href="/">Logout</a>
                </button>
            </div>
        </div>
    );
};

export default SidebarDokter;
