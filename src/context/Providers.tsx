'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { AuthProvider } from './AuthContext';
import { ShoppingCartProvider } from './ShoppingCartContext';
import { FavoritesProvider } from './FavoritesContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function Provider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ShoppingCartProvider>
          <FavoritesProvider>{children}</FavoritesProvider>
        </ShoppingCartProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}
