import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Login from '../components/Login'
import Footer from '../components/Footer'
import '../assets/css/home.css'
import Signup from '../components/Signup'
const Home = () => {
    return (
        <div className='home-overflow'>
          
                <Navbar />
                <Login/>
                <Signup/>
                <Footer />
          
        </div>
    )
}

export default Home
