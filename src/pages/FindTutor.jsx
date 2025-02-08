import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../assets/css/home.css'
import Find from '../components/Find'
import Sort from '../components/Sort'
const Home = () => {
    return (
        <div className='home-overflow'>
             
                <Sort/>
                <Find/>
                <Footer /> 
        </div>
    )
}

export default Home
