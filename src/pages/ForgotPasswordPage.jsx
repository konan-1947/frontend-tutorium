import React from 'react'
import ForgotPassword from '../components/auth/ForgotPassword'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function ForgotPasswordPage() {
  return (
    <div>
        <QueryClientProvider client={queryClient}>
            <ForgotPassword />
        </QueryClientProvider>
    </div>
  )
}
