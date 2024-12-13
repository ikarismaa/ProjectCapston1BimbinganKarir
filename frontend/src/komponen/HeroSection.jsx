import React from "react";
import heroImage from "../assets/rs.jpg"; // Pastikan Anda menambahkan gambar ke folder assets

const HeroSection = () => {
    return (
        <header
            id="hero"
            className="bg-cover bg-center flex items-center justify-center text-white"
            style={{
                backgroundImage: `url(${heroImage})`,
                backgroundSize: "cover", // Menjaga gambar tetap mencakup seluruh area
                backgroundPosition: "center", // Gambar tetap terpusat
                height: "400px", // Menentukan tinggi hero section
                width: "100%", // Lebar penuh
            }}
        >
            <div className="bg-blue-600 bg-opacity-60 p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-4xl font-bold mb-4">Selamat Datang di Poliklinik Kami</h1>
                <p className="text-lg mb-6">
                    Kami hadir untuk memberikan pelayanan kesehatan terbaik dengan fasilitas modern dan tim dokter berpengalaman.
                </p>
                <a
                    href="#services"
                    className="bg-white text-blue-600 font-semibold py-2 px-6 rounded hover:bg-gray-200"
                >
                    Lihat Layanan
                </a>
            </div>
        </header>
    );
};

export default HeroSection;
