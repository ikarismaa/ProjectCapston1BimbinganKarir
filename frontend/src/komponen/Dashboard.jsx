import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    // State untuk jumlah data
    const [jumlahPoli, setJumlahPoli] = useState(0);
    const [jumlahDokter, setJumlahDokter] = useState(0);
    const [jumlahPasien, setJumlahPasien] = useState(0);

    // Fungsi untuk mengambil data jumlah dari backend
    const fetchData = async () => {
        try {
            // Ambil data jumlah dokter
            const dokterResponse = await axios.get('http://localhost:8000/api/dokter/count');
            setJumlahDokter(dokterResponse.data.count);

            // Ambil data jumlah pasien
            const pasienResponse = await axios.get('http://localhost:8000/api/pasiens/count');
            setJumlahPasien(pasienResponse.data.count);

            // Ambil data jumlah poli
            const poliResponse = await axios.get('http://localhost:8000/api/poli/count');
            setJumlahPoli(poliResponse.data.count);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    // Ambil data saat komponen dimuat
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <main className="flex-1 ml-64 p-10 text-center">
                <h1 className="text-4xl font-bold mb-8 text-gray-800">Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-6">
                        <h3 className="text-lg font-medium text-gray-600">Jumlah Poli</h3>
                        <p className="text-4xl font-bold text-blue-600 mt-3">{jumlahPoli}</p>
                    </div>
                    <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-6">
                        <h3 className="text-lg font-medium text-gray-600">Jumlah Dokter</h3>
                        <p className="text-4xl font-bold text-green-600 mt-3">{jumlahDokter}</p>
                    </div>
                    <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-6">
                        <h3 className="text-lg font-medium text-gray-600">Jumlah Pasien</h3>
                        <p className="text-4xl font-bold text-red-600 mt-3">{jumlahPasien}</p>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Dashboard;
