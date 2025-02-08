import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../assets/css/home.css'
import TutorInfo from '../components/TutorInfo'
const Home = () => {
    return (
        <div className='home-overflow'>
          
               
                <TutorInfo />

                <Footer />
         
        </div>
    )
}

export default Home
