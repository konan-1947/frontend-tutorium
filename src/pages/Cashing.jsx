import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../assets/css/home.css'
import Cash from '../components/Cash'
const Home = () => {
    return (
        <div className='home-overflow'>
         
                <Cash />

                <Footer />
           
        </div>
    )
}

export default Home
