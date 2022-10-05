import React from 'react'
import { Navbar } from '../Navbar'

export const Layout = ({children}) => {
    return (
        <div style={{ minHeight: '100vh' }} className="pb-16">
            <Navbar />
            <div className='container m-auto'>
                {children}
            </div>
        </div>
    )
}
