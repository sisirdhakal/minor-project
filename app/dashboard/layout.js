"use client"; // this is a client component
import React from 'react'
import Sidebar from '../../components/sidebar'
import Topbar from '../../components/topbar';

export default function Layout({ children }) {
    return (
        <>
            <div className='flex h-screen'>
                <div className='sticky hidden lg:block bg-white top-0 h-screen'>
                    <Sidebar />
                </div>
                <div className='overflow-y-scroll pb-6 px-4 lg:px-12 w-full'>
                    <Topbar />
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}





