import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavbarAfter from '../components/learner/dashboard/NavbarAfter'
import Footer from '../components/Home/Footer'
import '../assets/css/home.css'
import TutorInfo from '../components/learner/dashboard/TutorInfo'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

const Home = () => {
    return (
        <div className='home-overflow'>
            <NavbarAfter />
            <QueryClientProvider client={queryClient}>
                <TutorInfo />
            </QueryClientProvider>
            <Footer />
        </div>
    )
}

export default Home
