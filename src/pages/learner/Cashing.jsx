import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavbarAfter from '../../components/learner/dashboard/NavbarAfter'
import Footer from '../../components/Home/Footer'
import '../assets/css/home.css'
import Cash from '../../components/learner/booking/Cash'

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
