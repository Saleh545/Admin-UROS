import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Bu sətri əlavə et
import App from './App.jsx'
import './i18n'; // <--- BU SƏTRİ ƏLAVƏ ET

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* Tətbiqi bununla əhatə edirik */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)