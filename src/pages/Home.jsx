import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navbar from '../components/Home/NavbarHome'
import Hero from '../components/Home/Hero'
import Carousel from '../components/Home/Carousel'
import BecomeTutor from '../components/Home/BecomeTutor'
import Lessons from '../components/Home/Lessons'
import Footer from '../components/Home/Footer'
import '../assets/css/home.css'
import P from '../components/Home/p'

const queryClient = new QueryClient()

const Home = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className='home-overflow'>   
                <Navbar />     
                <Hero />
                <P/>
                <Carousel />
                <BecomeTutor />
                <Lessons />
                <Footer />
            </div>
        </QueryClientProvider>
    )
} 

export default Home
