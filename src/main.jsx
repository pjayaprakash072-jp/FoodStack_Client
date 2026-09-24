import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position='bottom-center' theme='system' richColors closeButton duration={3000} />
    <App />
  </StrictMode>,
)
