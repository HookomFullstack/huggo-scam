import React from 'react'
import Logo from '../assets/logo.svg'

export const Navbar = () => {
  return (
    <div className='bg-[#0072FF] mb-14'>
        <div className='container m-auto py-2 flex items-center gap-2'>
            <img src={Logo} alt="logo" className='h-[40px]'/>
            <p className='text-white text-xl'>Huggo</p>
        </div>
    </div>
  )
}
