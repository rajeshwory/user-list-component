import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Register } from './pages/register.jsx'
import { Login } from './pages/login.jsx'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import UserDetail from './pages/user-detail.jsx'
import Dashboard from './pages/dashboard.jsx'
import { Test } from './pages/test.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to="/app"/>}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/app' element={<App />}/>
      <Route path='/user' element={<UserDetail />} />
      <Route path='/dashboard' element={<Dashboard />}/>
      <Route path='/test' element={<Test />}/>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
