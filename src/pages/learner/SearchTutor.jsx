import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Tutorcard from '../../components/learner/dashboard/SearchTutor';
import NavbarAfter from '../../components/learner/dashboard/NavbarLearner'
import Footer from '../../components/Home/Footer'
import '../../assets/css/home.css'

// Create a new QueryClient instance
const queryClient = new QueryClient();

const SearchTutor = () => {
  return (
    <div className='home-overflow'>
      <NavbarAfter />
      <QueryClientProvider client={queryClient}>
        <Tutorcard />
      </QueryClientProvider>
      <Footer /> 
    </div>
  );
};

// Render the App
export default SearchTutor;