import React, { useEffect, useState } from 'react'
import { DashboardLayout } from '../../components/layout/dashboard';
import Image from 'next/image';
import { statsOptions } from '../../utils/constants';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function Parent({cookie}) {
    const [dashboard, setdashboard] = useState(null)
    const [dashboardLoading, setdashboardLoading] = useState(false)

    useEffect(() => {
        const getDashboard = async () => {
            try {
                setdashboardLoading(true)
                const { data } = await axios.get(`http://localhost:8000/api/dashboard/`, {
                    withCredentials: true,
                    headers: {
                        "X-CSRFTOKEN": cookie.csrftoken
                    }
                })
                console.log("here")
                if (data) {
                    setdashboardLoading(false)
                    setdashboard(data)
                }

            } catch (error) {
                if (error.response?.data.msg) {
                    setdashboardLoading(false)
                    toast.error(error.response.data.msg)
                }
            }

        }
        getDashboard()
    }, [])
    
    return (
        <div>
            <div className='grid lg:grid-cols-3 gap-6 mb-8'>

                <div className="h-44 grid grid-cols-2 bg-white rounded-sm w-full items-center px-4" >
                    <div className='relative w-[114px]  h-[140px] flex justify-center items-center rounded-sm'>
                        <div className='border-[12px] rounded-full w-[114px] h-[114px] border-t-[#6DC9F7] rotate-[24deg] border-blue-400 bg-red-400 flex justify-center items-center'>
                            <p className='text-xl font-bold -rotate-[24deg] text-white'>{dashboard?.presentPercentage} %</p>
                        </div>
                    </div>
                    <div >
                        <h1 className='text-primary-text font-bold text-lg'>Attendance</h1>
                        <p className='text-secondary-text font-medium'>This Semester</p>
                        <p className='text-secondary-text font-medium'>Total Lectures: <span className='text-primary-text'>{dashboard?.lectureDays}</span></p>
                        <p className='text-secondary-text font-medium'>Present: <span className='text-primary-text'>{dashboard?.presentDays}</span></p>
                        <Link href='/teacher/attendance'>
                            <button className='bg-[#2091F9] rounded-lg hover: py-[3px] tracking-wider font-medium text-white px-2 text-clrprimary10 transition-all ease-linear duration-300 hover:text-'>
                                View Details
                            </button>
                        </Link>
                    </div>
                </div>

                {
                    statsOptions.map(item => {
                        const { id, title, icon, body, url } = item

                        return <div key={id} className="h-44 grid grid-cols-2 bg-white rounded-sm w-full items-center px-4" >
                            <div className='relative w-[100px] h-[140px]  rounded-sm'>
                                <Image
                                    alt=''
                                    priority
                                    src={icon}
                                    className='rounded-md'
                                    fill
                                    sizes="(min-width: 60em) 24vw,
        (min-width: 28em) 45vw,
        100vw"
                                />
                            </div>
                            <div >
                                <h1 className='text-primary-text mb-3 font-bold text-lg'>{title}</h1>
                                <p className='text-secondary-text font-medium mb-3 h-12'>{body}</p>
                                <Link href={url}>
                                    <button className='bg-[#2091F9] rounded-lg hover: py-[3px] tracking-wider font-medium text-white px-3 text-clrprimary10 transition-all ease-linear duration-300 hover:text-'>
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
Parent.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
