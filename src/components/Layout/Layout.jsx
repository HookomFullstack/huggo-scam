import React from 'react'
import { Navbar } from '../../context/Navbar'

export const Layout = ({children}) => {
    return (
        <div style={{ minHeight: '100vh' }} className="pb-16">
            <Navbar />
            <div className='container m-auto px-10'>
                {children}
            </div>
        </div>
    )
}
