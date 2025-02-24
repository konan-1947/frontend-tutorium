import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavbarAfter from '../components/learner/dashboard/NavbarAfter'
import Login from '../components/auth/Login'
import Footer from '../components/Home/Footer'
import '../assets/css/home.css'
import Signup from '../components/auth/Signup'
const Home = () => {
    return (
        <div className='home-overflow'>
          
                <NavbarAfter />
                <Login/>
             
                <Footer />
          
        </div>
    )
}

export default Home
