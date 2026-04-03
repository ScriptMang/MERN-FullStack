import {Routes, Route, Navigate} from 'react-router-dom'
import  {useUser} from './context/UserContext.jsx'

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'

import './App.css'

function App() {
  const {user} = useUser()
  return (
    <>
   <Navbar />
    { user ? 
    <Routes>
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
    :
   <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  }
    </>
  )
}

export default App
