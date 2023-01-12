import React from 'react'
import Sidebar from '../sidebar'
import Topbar from '../topbar'

export function DashboardLayout({ children }) {
    return (
        <>
            <div className='flex h-screen'>
                <div className='sticky hidden lg:block bg-white top-0 h-screen'>
                    <Sidebar />
                </div>
                <div className='overflow-y-scroll grid grid-rows-auto w-full px-12'>
                    <Topbar />
                    <div className=''>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}