import React from "react";
import aboutImage from "../assets/tim.jpg"; // Pastikan Anda menambahkan gambar ke folder assets

const AboutSection = () => {
    return (
        <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <img
            src={aboutImage}
            alt="Tentang Kami"
            className="w-full md:w-1/2 rounded-lg shadow-lg mb-6 md:mb-0"
            />
            <div className="md:ml-6 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-6 text-blue-600">Tentang Kami</h2>
            <p className="text-lg mb-4 text-gray-600">
                Poliklinik kami telah berdiri sejak 2010 dengan visi memberikan pelayanan kesehatan terbaik dan terpercaya bagi masyarakat.
            </p>
            <p className="text-lg mb-4 text-gray-600">
                Dengan fasilitas modern, tenaga medis profesional, dan berbagai layanan spesialis, kami siap membantu menjaga kesehatan Anda dan keluarga.
            </p>
            <p className="text-lg text-gray-600">
                Kepercayaan Anda adalah prioritas kami. Selamat datang di Poliklinik Kami.
            </p>
            </div>
        </div>
        </section>
    );
};

export default AboutSection;
