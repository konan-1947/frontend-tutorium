import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavbarAfter from '../components/learner/dashboard/NavbarAfter'
import Footer from '../components/Home/Footer'
import '../assets/css/home.css'
import TutorInfo from '../components/learner/dashboard/TutorInfo'
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
