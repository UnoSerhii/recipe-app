'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { SelectedMealsProvider } from '../contexts/SelectedMealsContext';

const queryClient = new QueryClient();

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SelectedMealsProvider>{children}</SelectedMealsProvider>
    </QueryClientProvider>
  );
}