import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../redux'
import Sidebar from '../sidebar'
import Topbar from '../topbar'

export function DashboardLayout({ children }) {

    const dispatch = useDispatch()
    const { sidebarUser } = bindActionCreators(actionCreators, dispatch)

    useEffect(() => {
        sidebarUser(localStorage.getItem('user'))
    }, [sidebarUser])


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