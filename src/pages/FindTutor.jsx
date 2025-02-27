import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavbarAfter from '../components/learner/dashboard/NavbarAfter'
import Footer from '../components/Home/Footer'
import '../assets/css/home.css'
import Find from '../components/learner/dashboard/Find'
import Sort from '../components/learner/dashboard/Sort'
const Home = () => {
    return (
        <div className='home-overflow'>
                <NavbarAfter />
                <div className='sort-container'>
                <Sort/>
                </div>
                <Find/>
                <Footer /> 
        </div>
    )
}

export default Home
