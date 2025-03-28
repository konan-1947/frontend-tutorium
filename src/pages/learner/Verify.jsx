import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import VerifyLearner from '../../components/learner/VerifyLearner';

const queryClient = new QueryClient();

const Verify = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <VerifyLearner />
    </QueryClientProvider>
  );
};

export default Verify;
