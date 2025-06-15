import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import router from './routes/Routes.jsx'
import { RouterProvider } from 'react-router'
import AuthProvider from './context/AuthProvider.jsx'
import { HelmetProvider } from 'react-helmet-async'


createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    </HelmetProvider>
  </StrictMode>
)
