import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import AuthRoutes from './router';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <Toaster  />
    <AuthRoutes />
</QueryClientProvider>
  // </React.StrictMode>
)
