'use client'

import { ThemeProvider } from '@/context/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => 
        new QueryClient({
            defaultOptions: {
                queries: {
                    staleTime: Number(process.env.NEXT_PUBLIC_CACHE_TTL) || 5 * 60 * 1000,
                },
            },
        })
    );

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                {children}
            </ThemeProvider>

        </QueryClientProvider>
    )
}

