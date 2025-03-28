import React from 'react'
import NavBar from '../../components/learner/profile/NavbarProfileLearner'
import Profile from '../../components/learner/profile/ProfileLearner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
import ListAllContracts from '../../components/learner/profile/ListAllContract'
export default function Profilelearner() {
  return (
    <div>
        <NavBar />
        <QueryClientProvider client={queryClient}>
            <Profile />
         
        </QueryClientProvider>
    </div>
  )
}
