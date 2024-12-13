import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api";

const Pasien = () => {
  const [pasiens, setPasiens] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    nama: "",
    alamat: "",
    no_ktp: "",
    no_hp: "",
    no_rm: "",
  });

  const fetchPasiens = async () => {
    try {
      const response = await axios.get("/pasien");
      setPasiens(response.data);
    } catch (error) {
      console.error("Error fetching pasien:", error);
    }
  };

  useEffect(() => {
    fetchPasiens();
  }, []);

  const openAddModal = () => {
    setIsEditMode(false);
    setFormData({ id: null, nama: "", alamat: "", no_ktp: "", no_hp: "", no_rm: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (pasien) => {
    setIsEditMode(true);
    setFormData(pasien);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ id: null, nama: "", alamat: "", no_ktp: "", no_hp: "", no_rm: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await axios.put(`/pasien/${formData.id}`, formData); 
      } else {
        await axios.post("/pasien", formData);
      }
      fetchPasiens();
      closeModal();
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data); 
      } else {
        console.error("Error saving pasien:", error.message);
      }
    }
  };
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/pasien/${id}`);
      fetchPasiens();
    } catch (error) {
      console.error("Error deleting pasien:", error);
    }
  };

  return (
    <>
    <div className="p-10 bg-gray-100 min-h-screen pl-60">
      {/* <h1 className="text-2xl font-bold mb-4">Pasien</h1> */}
      <div className="max-w-5xl mx-auto bg-white shadow rounded-lg p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Daftar Pasien</h1>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          Tambah Pasien
        </button>
      
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border border-gray-200 rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border-b">Nama</th>
              <th className="py-2 px-4 border-b">Alamat</th>
              <th className="py-2 px-4 border-b">No KTP</th>
              <th className="py-2 px-4 border-b">No HP</th>
              <th className="py-2 px-4 border-b">No Rekam Medis</th>
              <th className="py-2 px-4 border-b">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pasiens.map((pasien) => (
              <tr key={pasien.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b text-center">{pasien.nama}</td>
                <td className="py-2 px-4 border-b text-center">{pasien.alamat}</td>
                <td className="py-2 px-4 border-b text-center">{pasien.no_ktp}</td>
                <td className="py-2 px-4 border-b text-center">{pasien.no_hp}</td>
                <td className="py-2 px-4 border-b text-center">{pasien.no_rm}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    onClick={() => openEditModal(pasien)}
                    className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(pasien.id)}
                    className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded p-6 w-96">
            <h3 className="text-xl font-bold mb-4">
              {isEditMode ? "Edit Data Pasien" : "Tambah Data Pasien"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block font-semibold mb-1 text-left">Nama</label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1 text-left">Alamat</label>
                <input
                  type="text"
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1 text-left">No KTP</label>
                <input
                  type="text"
                  name="no_ktp"
                  value={formData.no_ktp}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1 text-left">No HP</label>
                <input
                  type="text"
                  name="no_hp"
                  value={formData.no_hp}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1 text-left">No Rekam Medis</label>
                <input
                  type="text"
                  name="no_rm"
                  value={formData.no_rm}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 mr-2"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Pasien;