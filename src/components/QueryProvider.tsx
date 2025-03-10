'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { SelectedMealsProvider } from '../contexts/SelectedMealsContext';

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <SelectedMealsProvider>
            {children}
          </SelectedMealsProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}