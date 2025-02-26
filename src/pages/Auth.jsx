import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NavbarAfter from '../components/learner/dashboard/NavbarAfter';
import Login from '../components/auth/Login';
import Footer from '../components/Home/Footer';
import '../assets/css/home.css';

// Tạo instance của QueryClient
const queryClient = new QueryClient();

const Home = () => {
  return (
      <div className="home-overflow">
        <NavbarAfter />
        <QueryClientProvider client={queryClient}>
            <Login />
        </QueryClientProvider>
        <Footer />
      </div>
  );
};

export default Home;