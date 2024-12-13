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
                <Route exact path="/dasboardpasien/:id" element={<PageDasboardPasien />} />
                <Route exact path="/dasboarddokter/:id" element={<PageDasboardDokter />} />
              </Routes>
        </Router>
        </>
        
  )
}

export default App
