import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { WeatherProvider } from './context/WeatherContext.jsx'
import { AuthProvider, useAuthContext } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <WeatherProvider>
        <App />
      </WeatherProvider>
    </AuthProvider>
  </BrowserRouter>
)
