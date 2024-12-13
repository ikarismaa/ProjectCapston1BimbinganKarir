import React from 'react'
import Navbar from '../komponen/Navbar'
import HeroSection from '../komponen/HeroSection'
import AboutSection from '../komponen/AboutSection'
import ServicesSection from '../komponen/ServicesSection'
import ContactSection from '../komponen/ContactSection'
import Footer from '../komponen/Footer'

function LandingPage() {
    return (
        <>
        <Navbar/>
        <HeroSection/>
        <AboutSection/>
        <ServicesSection/>
        <ContactSection/>
        <Footer/>
        </>
    )
}

export default LandingPage
