import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api";

const JadwalPeriksaDokter = () => {
    const [jadwal, setJadwal] = useState([]);
    const [dokter, setDokter] = useState(null);
    const [form, setForm] = useState({
        hari: "",
        jam_mulai: "",
        jam_selesai: "",
        status: "aktif",
    });
    const [isAdding, setIsAdding] = useState(false);
    const [selectedJadwal, setSelectedJadwal] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const loadDokterData = () => {
        const storedDokter = localStorage.getItem("dokter");
        if (storedDokter) {
        const parsedDokter = JSON.parse(storedDokter);
        setDokter(parsedDokter);
        console.log("Dokter berhasil dimuat:", parsedDokter);
        } else {
        setError("Data dokter tidak ditemukan. Silakan login ulang.");
        }
    };

    const fetchJadwal = async () => {
        if (!dokter) return;
        try {
        const response = await axios.get("/jadwal-periksa", {
            params: { id_dokter: dokter.id },
        });
        setJadwal(response.data || []);
        setError("");
        } catch (err) {
        setError("Gagal memuat jadwal periksa.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const resetForm = () => {
        setForm({ hari: "", jam_mulai: "", jam_selesai: "", status: "aktif" });
        setSelectedJadwal(null);
        setError("");
        setSuccess("");
    };

    const handleAddJadwal = async (e) => {
        e.preventDefault();
        if (form.jam_mulai >= form.jam_selesai) {
        setError("Jam selesai harus lebih besar dari jam mulai.");
        return;
        }
        try {
        console.log("Data yang dikirim:", { ...form, id_dokter: dokter.id });
        await axios.post("/jadwal-periksa", {
            ...form,
            id_dokter: dokter.id,
        });
        await fetchJadwal(); // Fetch ulang data setelah berhasil menambahkan
        resetForm();
        setIsAdding(false); // Tutup form setelah berhasil
        setSuccess("Jadwal berhasil ditambahkan!");
        } catch (err) {
            if(err.response && err.response.data.error){
                    alert(err.response.data.error);
                }else{
                    setError("Gagal menyimpan jadwal.Periksa input Anda. ");
                }
        //console.error("Kesalahan saat menambahkan jadwal:", err.response?.data || err.message);
        //setError(err.response?.data?.message || "Gagal menambahkan jadwal. Silakan coba lagi.");
        }
    };

    const handleEditJadwal = async (e) => {
        e.preventDefault();
        if (!selectedJadwal) return;

        if (form.jam_mulai >= form.jam_selesai) {
        setError("Jam selesai harus lebih besar dari jam mulai.");
        return;
        }

        try {
        const updatedFields = Object.keys(form).reduce((acc, key) => {
            if (form[key] !== selectedJadwal[key]) {
            acc[key] = form[key];
            }
            return acc;
        }, {});

        if (Object.keys(updatedFields).length === 0) {
            setError("Tidak ada perubahan data.");
            return;
        }

        updatedFields.id_dokter = dokter.id;

        console.log("Mengirim data edit:", updatedFields);

        await axios.put(`/jadwal-periksa/${selectedJadwal.id}`, updatedFields);

        await fetchJadwal(); // Fetch ulang data jadwal
        resetForm(); // Tutup form
        setIsAdding(false); // Tutup form setelah berhasil
        setSuccess("Jadwal berhasil diperbarui!");
        } catch (err) {
        console.error("Kesalahan saat memperbarui jadwal:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Gagal memperbarui jadwal. Silakan coba lagi.");
        }
    };

    useEffect(() => {
        loadDokterData();
    }, []);

    useEffect(() => {
        if (dokter) fetchJadwal();
    }, [dokter]);

    return (
        <>
        <div className="p-10 bg-gray-100 min-h-screen pl-60">
        <div className="max-w-5xl mx-auto bg-white shadow rounded-lg p-4">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-500">Jadwal Periksa</h1>

        {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}
        {success && <div className="bg-green-500 text-white p-2 rounded mb-4">{success}</div>}

        <div className="mb-4">
            <p>Dokter Login: <strong>{dokter?.nama || "Loading..."}</strong></p>
        </div>

        <button
            onClick={() => {
            setIsAdding(true);
            resetForm();
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Tambah Jadwal
        </button>

        {(isAdding || selectedJadwal) && (
            <form onSubmit={isAdding ? handleAddJadwal : handleEditJadwal} className="bg-gray-100 p-6 my-4 rounded">
            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-bold mb-2">Nama Dokter</label>
                <input
                    type="text"
                    value={dokter?.nama || ""}
                    className="w-full p-2 border rounded bg-gray-200 cursor-not-allowed"
                    readOnly
                />
                </div>
                <div>
                <label className="block text-sm font-bold mb-2">Hari</label>
                <select
                    type="text"
                    name="hari"
                    value={form.hari}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="Senin">Senin</option>
                    <option value="Selasa">Selasa</option>
                    <option value="Rabu">Rabu</option>
                    <option value="Kamis">Kamis</option>
                    <option value="Jumat">Jumat</option>
                    <option value="Sabtu">Sabtu</option>
                </select>
                </div>
                <div>
                <label className="block text-sm font-bold mb-2">Jam Mulai</label>
                <input
                    type="time"
                    name="jam_mulai"
                    value={form.jam_mulai}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                />
                </div>
                <div>
                <label className="block text-sm font-bold mb-2">Jam Selesai</label>
                <input
                    type="time"
                    name="jam_selesai"
                    value={form.jam_selesai}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                />
                </div>
                <div>
                <label className="block text-sm font-bold mb-2">Status</label>
                <select
                    name="status"
                    value={form.status}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="aktif">aktif</option>
                    <option value="tidak aktif">tidak aktif</option>
                </select>
                </div>
            </div>
            <div className="mt-4 flex gap-4">
                <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                {isAdding ? "Simpan Jadwal" : "Perbarui Jadwal"}
                </button>
                <button
                type="button"
                onClick={() => {
                resetForm();
                setIsAdding(false);
                setSelectedJadwal(null);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                Batal
                </button>
            </div>
            </form>
        )}

        <table className="w-full mt-4 border border-gray-300">
            <thead className="bg-blue-200">
            <tr>
                <th className="border px-4 py-2">No</th>
                <th className="border px-4 py-2">Nama Dokter</th>
                <th className="border px-4 py-2">Hari</th>
                <th className="border px-4 py-2">Jam Mulai</th>
                <th className="border px-4 py-2">Jam Selesai</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Aksi</th>
            </tr>
            </thead>
            <tbody>
            {jadwal.length > 0 ? (
                jadwal.map((item, index) => (
                <tr key={item.id}>
                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                    <td className="border px-4 py-2">{dokter?.nama}</td>
                    <td className="border px-4 py-2">{item.hari}</td>
                    <td className="border px-4 py-2">{item.jam_mulai}</td>
                    <td className="border px-4 py-2">{item.jam_selesai}</td>
                    <td className="border px-4 py-2">{item.status}</td>
                    <td className="border px-4 py-2 text-center">
                    <button
                        onClick={() => {
                        setSelectedJadwal(item);
                        setForm(item);
                        setIsAdding(false);
                        }}
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2">
                        Edit
                    </button>
                    </td>
                </tr>
                ))
            ) : (
                <tr>
                <td colSpan="7" className="border px-4 py-2 text-center">Tidak ada jadwal.</td>
                </tr>
            )}
            </tbody>
        </table>
        </div>
        </div>
        </>
    );
};

export default JadwalPeriksaDokter;