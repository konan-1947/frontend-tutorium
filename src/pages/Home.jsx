import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '../components/Home/NavbarHome'
import Hero from '../components/Home/Hero'
import Carousel from '../components/Home/Carousel'
import BecomeTutor from '../components/Home/BecomeTutor'
import Lessons from '../components/Home/Lessons'
import Footer from '../components/Home/Footer'
import '../assets/css/home.css'
const Home = () => {
    return (
        <div className='home-overflow'>   
                <Navbar />     
                <Hero />
                <Carousel />
                <BecomeTutor />
                <Lessons />
                <Footer />
        </div>
    )
} 

export default Home
