import React from "react";
import { FaPhone, FaEnvelope } from "react-icons/fa"; // Ikon untuk kontak

const ContactSection = () => {
    return (
        <section id="contact" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Hubungi Kami</h2>
            <p className="text-center text-gray-600 mb-8">
            Jika Anda memiliki pertanyaan atau membutuhkan bantuan, jangan ragu untuk menghubungi kami.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12">
            {/* Kontak Telepon */}
            <div className="flex flex-col items-center text-center">
                <FaPhone className="text-blue-600 text-4xl mb-4" />
                <h3 className="text-lg font-bold mb-2">Telepon</h3>
                <a
                href="tel:+628123456789"
                className="text-gray-600 hover:underline"
                >
                +62 812 3456 789
                </a>
            </div>

            {/* Kontak Email */}
            <div className="flex flex-col items-center text-center">
                <FaEnvelope className="text-blue-600 text-4xl mb-4" />
                <h3 className="text-lg font-bold mb-2">Email</h3>
                <a
                href="mailto:info@poliklinik.com"
                className="text-gray-600 hover:underline"
                >
                info@poliklinik.com
                </a>
            </div>
            </div>
        </div>
        </section>
    );
};

export default ContactSection;
