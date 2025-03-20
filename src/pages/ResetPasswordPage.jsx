import React from 'react'
import ResetPassword from '../components/auth/ResetPassword'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function ResetPasswordPage() {
  return (
    <div>
        <QueryClientProvider client={queryClient}>
            <ResetPassword />
        </QueryClientProvider>
    </div>
  )
}
