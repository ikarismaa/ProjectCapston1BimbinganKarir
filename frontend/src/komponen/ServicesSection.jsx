import React from "react";
import { FaTooth, FaStethoscope, FaHeartbeat, FaBaby } from "react-icons/fa"; // Menggunakan react-icons untuk ikon

const ServicesSection = () => {
    const services = [
        {
        title: "Kesehatan Gigi",
        description:
            "Perawatan dan pemeriksaan gigi terbaik oleh dokter spesialis untuk senyum yang lebih sehat.",
        icon: <FaTooth className="text-blue-600 text-4xl mb-4" />,
        },
        {
        title: "THT (Telinga, Hidung, Tenggorokan)",
        description:
            "Layanan diagnosis dan perawatan untuk masalah THT dengan teknologi modern.",
        icon: <FaStethoscope className="text-blue-600 text-4xl mb-4" />,
        },
        {
        title: "Kesehatan Jantung",
        description:
            "Pemeriksaan jantung komprehensif untuk memastikan kesehatan kardiovaskular Anda.",
        icon: <FaHeartbeat className="text-blue-600 text-4xl mb-4" />,
        },
        {
        title: "Ibu dan Anak",
        description:
            "Layanan kesehatan khusus untuk ibu hamil dan anak dengan pendekatan ramah keluarga.",
        icon: <FaBaby className="text-blue-600 text-4xl mb-4" />,
        },
    ];

    return (
        <section id="services" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Layanan Kami</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {services.map((service, index) => (
                <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-2xl transition-shadow flex flex-col items-center"
                >
                {service.icon}
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
};

export default ServicesSection;
