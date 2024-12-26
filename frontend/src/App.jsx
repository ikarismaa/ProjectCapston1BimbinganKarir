import { useState } from 'react'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterUser from './komponen/RegisterUser'
import LoginUser from './komponen/LoginUser'
import Login from './komponen/Login'
import LandingPage from './page/LandingPage'
import PageAdminDasboard from './page/PageAdminDasboard'
import PageAdminDokter from './page/PageAdminDokter'
import PageAdminPasien from './page/PageAdminPasien'
import PageAdminPoli from './page/PageAdminPoli'
import PageAdminObat from './page/PageAdminObat'
import PageDasboardPasien from './page/PageDasboardPasien'
import PageDasboardDokter from './page/PageDasboardDokter'
import PageJadwalPeriksaDokter from './page/PageJadwalPeriksaDokter';
import PageDaftarPeriksaDokter from './page/PageDaftarPeriksaDokter';
import PageDaftarPeriksaPasien from './page/PageDaftarPeriksaPasien';
import PagedetailPeriksaDokter from './page/PagedetailPeriksaDokter';
import PageRiwayatPasien from './page/PageRiwayatPasien';
import PageDetailRiwayatDokter from './page/PageDetailRiwayatDokter';
import PageDetailRiwayatPasien from './page/PageDetailRiwayatPasien';

function App() {
  return (
        <>
        <Router>
              <Routes>
                <Route path='/' element={<LandingPage />}/>
                <Route path='/DasboardAdmin' element={<PageAdminDasboard />}/>
                <Route path='/dokter' element={<PageAdminDokter />}/>
                <Route path='/pasien' element={<PageAdminPasien />}/>
                <Route path='/poli' element={<PageAdminPoli />}/>
                <Route path='/obat' element={<PageAdminObat />}/>
                <Route path='/registeruser' element={<RegisterUser />}/>
                <Route path='/loginuser' element={<LoginUser />}/>
                <Route path='/login' element={<Login />}/>
                <Route exact path="/pasien/:id/dasboardpasien" element={<PageDasboardPasien />} />
                <Route exact path="/dokter/:id/dasboarddokter" element={<PageDasboardDokter />} />
                <Route path='/dokter/:id/jadwalperiksadokter' element={<PageJadwalPeriksaDokter />} />
                <Route path='/dokter/:id/data-pasien' element={<PageDaftarPeriksaDokter />}/>
                <Route path='/pasien/:id/daftarperiksapasien' element={<PageDaftarPeriksaPasien />}/>
                <Route path='/detailperiksadokter/:id' element={<PagedetailPeriksaDokter />}/>
                <Route path='/detailperiksadokter/update/:id' element={<PagedetailPeriksaDokter />}/>
                <Route path='/dokter/:id/riwayatpasien' element={<PageRiwayatPasien />}/>
                <Route path='/dokter/:id/detailriwayatpasien' element={<PageRiwayatPasien />}/>
                <Route path='/pasien/:id/detailriwayatpasien' element={<PageDaftarPeriksaPasien />}/>
                <Route path='/dokter/:idDokter/riwayatpasien/detail/:id' element={<PageDetailRiwayatDokter />}/>
                <Route path='/pasien/:idPasien/riwayat-periksa/detail/:idDaftarPoli' element={<PageDetailRiwayatPasien/>}/>
              </Routes>
        </Router>
        </>
        
  )
}

export default App
