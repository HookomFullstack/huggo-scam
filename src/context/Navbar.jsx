import React from 'react'
import logo from '../assets/logo.png'

export const Navbar = () => {
  return (
    <div className='bg-[#0072FF] mb-14'>
        <div className='container mx-10 py-2 flex items-center gap-2'>
            <img src={logo} alt="logo" className='h-[40px]'/>
            <p className='text-white text-xl'>Huggo</p>
        </div>
    </div>
  )
}