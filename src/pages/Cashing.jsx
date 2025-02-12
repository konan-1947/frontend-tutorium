import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavbarAfter from '../components/NavbarAfter'
import Footer from '../components/Footer'
import '../assets/css/home.css'
import Cash from '../components/Cash'

const Home = () => {
    return (
        <div className='home-overflow'>
            
                <NavbarAfter />
                <Cash />

                <Footer />
           
        </div>
    )
}

export default Home
