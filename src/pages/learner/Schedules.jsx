import React from 'react'
import Schedulesa from '../../components/learner/booking/bookingContracts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NavBar from '../../components/learner/profile/NavbarProfileLearner';
const queryClient = new QueryClient();
export default function Schedulest() {
  return (
    <div>
      <NavBar />
         <QueryClientProvider client={queryClient}>
        <Schedulesa />
      </QueryClientProvider>
    </div>
  )
}
