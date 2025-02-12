import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavbarAfter from '../components/NavbarAfter'
import Footer from '../components/Footer'
import '../assets/css/home.css'
import TutorInfo from '../components/TutorInfo'
const Home = () => {
    return (
        <div className='home-overflow'>

            <NavbarAfter />
            <TutorInfo />

            <Footer />

        </div>
    )
}

export default Home
