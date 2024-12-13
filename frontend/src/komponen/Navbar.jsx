import React from "react";

const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white py-4 sticky top-0 z-50 shadow-lg">
            <div className="container mx-auto flex justify-between items-center px-4">
                <h1 className="text-xl font-bold">Poliklinik Kami</h1>
                <ul className="flex space-x-4">
                    <li>
                        <a href="#hero" className="hover:underline">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#about" className="hover:underline">
                            About
                        </a>
                    </li>
                    <li>
                        <a href="#services" className="hover:underline">
                            Services
                        </a>
                    </li>
                    <li>
                        <a href="#contact" className="hover:underline">
                            Contact
                        </a>
                    </li>
                </ul>
                <div className="flex space-x-4">
                    <a
                        href="/loginuser"
                        className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition ease-in-out duration-300 text-center"
                        style={{ display: 'inline-block' }}
                    >
                        Login
                    </a>
                    <a
                        href="/registeruser"
                        className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition ease-in-out duration-300 text-center"
                        style={{ display: 'inline-block' }}
                    >
                        Register
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
