import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

axios.defaults.baseURL = "http://localhost:8000/api";

const DetailRiwayatDokter = () => {
    const { idDokter, id } = useParams();
    const [detail, setDetail] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id || !idDokter) {
            setError("ID dokter atau ID pasien tidak valid.");
            return;
        }

        const fetchDetail = async () => {
            try {
                const response = await axios.get(`/pasienss/${id}/detail-pasien`, {
                    params: { id_dokter: idDokter },
                });
                setDetail(response.data);
            } catch (err) {
                const errorMessage =
                    err.response?.data?.error || "Gagal memuat detail pasien.";
                setError(errorMessage);
            }
        };

        fetchDetail();
    }, [id, idDokter]);

    const handleDownloadPDF = async () => {
        const element = document.getElementById("patient-detail");

        const buttons = element.querySelectorAll("button");
        buttons.forEach((btn) => (btn.style.display = "none"));

        try {
            const canvas = await html2canvas(element);
            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF();
            pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
            pdf.save("riwayat_pasien.pdf");
        } finally {
            buttons.forEach((btn) => (btn.style.display = ""));
        }
    };

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-br from-red-500 to-pink-600 text-white text-center p-6">
                <p className="text-lg font-semibold">{error}</p>
            </div>
        );
    }

    if (!detail) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-center p-6">
                <p className="text-lg font-semibold">Memuat data...</p>
            </div>
        );
    }

    const {
        nama,
        keluhan,
        tgl_periksa,
        catatan,
        obat,
        biaya_total,
        poli,
        dokter,
        hari,
        jam_mulai,
        jam_selesai,
        no_antrian,
    } = detail;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-100 to-gray-200 pl-60">
            <div
                className="bg-white p-8 rounded-lg shadow-xl w-full max-w-5xl"
                id="patient-detail"
            >
                <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
                    Detail Riwayat Pasien
                </h1>

                {/* Patient Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <DetailField label="Nama Pasien" value={nama} />
                    <DetailField label="Keluhan" value={keluhan} />
                    <DetailField label="Poli" value={poli} />
                    <DetailField label="Dokter" value={dokter} />
                    <DetailField label="Hari" value={hari} />
                    <DetailField label="Jam Mulai" value={jam_mulai} />
                    <DetailField label="Jam Selesai" value={jam_selesai} />
                    <DetailField label="No. Antrian" value={no_antrian} />
                    <DetailField
                        label="Tanggal Periksa"
                        value={
                            tgl_periksa
                                ? new Date(tgl_periksa).toLocaleString()
                                : "Tidak tersedia"
                        }
                    />
                    <DetailField label="Catatan" value={catatan || "Tidak ada catatan"} />
                </div>

                {/* Obat Section */}
                <div className="mt-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Obat yang Diberikan
                    </h2>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        {obat && obat.length > 0 ? (
                            <ul className="space-y-2">
                                {obat.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between items-center text-gray-700"
                                    >
                                        <span>{item.nama_obat}</span>
                                        <span className="font-semibold">
                                            Rp {item.harga.toLocaleString()}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">Tidak ada obat yang diberikan.</p>
                        )}
                    </div>
                </div>

                {/* Total Biaya */}
                <div className="mt-8 text-right">
                    <p className="text-lg font-bold text-gray-800">
                        Total Biaya:{" "}
                        <span className="text-green-600">
                            Rp {biaya_total?.toLocaleString() || "N/A"}
                        </span>
                    </p>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex justify-between">
                    <button
                        onClick={() => window.history.back()}
                        className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
                    >
                        Kembali
                    </button>
                    <button
                        onClick={handleDownloadPDF}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

/* DetailField Component */
const DetailField = ({ label, value }) => (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <p className="text-sm font-semibold text-gray-500">{label}</p>
        <p className="text-lg font-bold text-gray-800">{value || "Tidak tersedia"}</p>
    </div>
);

export default DetailRiwayatDokter;
