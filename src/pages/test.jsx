import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NavbarAfter from '../components/learner/profile/Navbar';
import Login from '../components/auth/Login';
import Footer from '../components/Home/Footer';
import '../assets/css/home.css';
import Test from '../components/admin/dashboard/Scenes/test';
// Tạo instance của QueryClient
const queryClient = new QueryClient();

const Home = () => {
  return (
      <div className="home-overflow">

            <Test />

      </div>
  );
};

export default Home;