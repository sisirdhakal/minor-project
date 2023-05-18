import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../redux'
import Sidebar from '../sidebar'
import Topbar from '../topbar'

export function DashboardLayout({ children }) {

    const dispatch = useDispatch()
    const router = useRouter()
    const { sidebarUser, setUserName } = bindActionCreators(actionCreators, dispatch)
    const [role, setRole] = useState(null);


    useEffect(() => {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('role='))
            ?.split('=')[1];
        setRole(cookieValue ? cookieValue.toLowerCase() : null)

    }, [])

    useEffect(() => {
        sidebarUser(role)
    }, [role])

    useEffect(() => {
        const userName = localStorage.getItem("userName")
        if (userName) {
            setUserName(userName)
        }
    }, [])


    if (!role) {
        // Wait until the role cookie is loaded
        return null;
    }

    // Define the allowed routes for each role
    const allowedRoutes = {
        teacher: ['/teacher', '/teacher/*'],
        student: ['/student', '/student/*'],
        parent: ['/parent', '/parent/*'],
        collegeadmin: ['/collegeadmin', '/collegeadmin/*']
    };

    // Check if the current route is allowed for the user's role
    const isRouteAllowed = allowedRoutes[role].some(route => router.pathname.startsWith(route));


    if (!isRouteAllowed) {
        // If the route is not allowed, redirect to the appropriate page
        router.push(`/${role}`);
        return null;
    }


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