import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Herosection from '../components/herosection'
import Feature from '../components/Feature'
import CarouselSection from '../components/CarouselSection'
import BecomeTutor from '../components/BecomeTutor'
import LessonsSection from '../components/LessonsSection'
import Footer from '../components/Footer'
import '../assets/css/home.css'
const Home = () => {
    return (
        <div className='home-overflow'>
            <BrowserRouter>
                <Navbar />
                <Herosection />
                <Feature />
                <CarouselSection />
                <BecomeTutor />
                <LessonsSection />
                <Footer />
            </BrowserRouter>
        </div>
    )
}

export default Home
