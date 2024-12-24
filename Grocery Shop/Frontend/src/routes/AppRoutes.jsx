import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../components/Login'
import Register from '../components/Register'
import Home from '../components/Home'


const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
