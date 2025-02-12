import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Carousel from '../components/Carousel'
import BecomeTutor from '../components/BecomeTutor'
import Lessons from '../components/Lessons'
import Footer from '../components/Footer'
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
