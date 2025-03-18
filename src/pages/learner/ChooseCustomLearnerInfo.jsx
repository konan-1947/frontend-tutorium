import React from 'react'
import Control from '../../components/learner/chooseinforlearner/ControlChooseInfor'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function ChooseCustomLearnerInfo() {
  return (
    <QueryClientProvider client={queryClient}>
    
        <Control />
      
    </QueryClientProvider>
  )
}
