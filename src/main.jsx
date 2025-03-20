import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Register } from './pages/register.jsx'
import { Login } from './pages/login.jsx'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to="/register"/>}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/app' element={<App />}/>
    </Routes>
    </BrowserRouter>
    {/* <Register /> */}
    {/* <App /> */}
  </StrictMode>,
)
