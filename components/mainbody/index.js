import React, { useEffect, useState } from 'react'

import { studentStatsOptions } from '../../utils/constants'
import Image from 'next/image'
import { books, noticeOptions } from '../../utils/mockdata'
import ViewNotice from '../notices/viewNotice'
import axios from 'axios'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../redux'
import Link from 'next/link'
import CenteredLoading from '../../common/Loader'


function MainBody({ cookie }) {

    const { allNotices, activeNotice, activeNoticesDatas } = useSelector(state => state.notices)
    const { sidebarUser } = useSelector(state => state.dashboard)
    const dispatch = useDispatch()
    const { setAllNotices, setActiveNotice, setActiveNoticeDatas } = bindActionCreators(actionCreators, dispatch)

    const [visible, setvisible] = useState(false)
    const [notices, setnotices] = useState([])

    const [dashboard, setdashboard] = useState(null)
    const [dashboardLoading, setdashboardLoading] = useState(false)
    const [noticeLoading, setnoticeLoading] = useState(false)

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
        const getData = async () => {
            try {
                setnoticeLoading(true)
                const { data } = await axios.get(`http://localhost:8000/api/view-notice/`, {
                    withCredentials: true,
                    headers: {
                        "X-CSRFTOKEN": cookie.csrftoken
                    }
                })
                if (data) {
                    setnoticeLoading(false)
                    setAllNotices(data)
                }

            } catch (error) {
                setnoticeLoading(false)
                console.log(error)
            }

        }
        getDashboard()
        getData()
    }, [])

    useEffect(() => {
        let noticeDatas = `${activeNotice}Notices`
        if (noticeDatas && allNotices) {
            const values = allNotices[noticeDatas];
            setActiveNoticeDatas(values ?? [])

        }
    }, [activeNotice, allNotices])



    return (
        <>
            <div className='w-full flex-1 pb-6'>

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
                            <Link href='/student/attendance'>
                                <button className='bg-[#2091F9] rounded-lg hover: py-[3px] tracking-wider font-medium text-white px-2 text-clrprimary10 transition-all ease-linear duration-300 hover:text-'>
                                    View Details
                                </button>
                            </Link>
                        </div>
                    </div>

                    {
                        studentStatsOptions.map(item => {
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
                <div className='grid lg:grid-cols-2 gap-10'>
                    <div>
                        <div className='bg-white h-10 flex rounded-sm px-5 items-center py-1 mb-3'>
                            <div className='relative w-[24px] mr-2 h-[24px]  rounded-sm'>
                                <Image
                                    alt=''
                                    priority
                                    src={"/assets/images/library.svg"}
                                    className='rounded-md'
                                    fill
                                    sizes="(min-width: 60em) 24vw,
                            (min-width: 28em) 45vw,
                            100vw"
                                />
                            </div>
                            <p className='text-primary-text font-bold mt-[2px]'>Library</p>
                        </div>
                        {
                            dashboardLoading ?
                                <div className='lg:min-h-[460px] py-2 lg:pt-20 px-5 bg-white w-full rounded-sm'>
                                    <p className='text-secondary-text text-center text-lg font-medium'>Loading library data ...</p>
                                    <CenteredLoading />
                                </div> :
                                <div className='lg:min-h-[460px] py-2 lg:py-0 px-5 bg-white w-full rounded-sm'>
                                    {
                                        dashboard?.libraryData.map((book) => {
                                            const { id, book_name, book_number, issued_date: date } = book
                                            return <div key={id} className=" flex py-1 items-center">

                                                <div className='relative z-10 w-[56px] mr-4 h-[56px] rounded-sm'>
                                                    <Image
                                                        alt=''
                                                        priority
                                                        src={"/assets/images/book.svg"}
                                                        className='rounded-md'
                                                        fill
                                                        sizes="(min-width: 60em) 24vw,
                                (min-width: 28em) 45vw,
                                100vw"
                                                    />

                                                </div>
                                                <div className='flex-1'>
                                                    <p className='text-primary-text font-bold text-[16px]'>{book_name} - {book_number}</p>
                                                    <p className='font-semibold text-[#48CAE4]'>Issued Date: {date} </p>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                        }
                    </div>
                    <div>
                        <div className='bg-white h-10 flex rounded-sm items-center px-5 py-1 mb-3'>
                            <div className='relative w-[28px] h-[36px] mr-2 rounded-sm'>
                                <Image
                                    alt=''
                                    priority
                                    src={"/assets/images/notes.svg"}
                                    className='rounded-md'
                                    fill
                                    sizes="(min-width: 60em) 24vw,
                            (min-width: 28em) 45vw,
                            100vw"
                                />
                            </div>
                            <p className='text-primary-text font-bold'>Notices</p>

                        </div>
                        <div className='h-[460px] relative bg-white w-full rounded-sm'>
                            <div className='grid grid-cols-3'>

                                {
                                    noticeOptions.map(({ id, name }) => {
                                        return <button key={id} className={`font-bold transition-all ease-in-out duration-300  text-lg py-2 font-sans ${activeNotice.toLocaleLowerCase() === name.toLocaleLowerCase() ? ("border-b-[3px] text-primary-text border-secondary-text") : ("text-[#0096C7] border-b-[3px] border-white")}`} onClick={() => { setActiveNotice(name.toLowerCase()) }}>
                                            {name}
                                        </button>
                                    })
                                }

                            </div>
                            {
                                noticeLoading ?
                                    <div className='lg:min-h-[460px] py-2 lg:pt-9 px-5 bg-white w-full rounded-sm'>
                                        <p className='text-secondary-text text-center text-lg font-medium'>Loading Notices...</p>
                                        <CenteredLoading />
                                    </div> :
                                    <div className='py-4 '>

                                        <ViewNotice notices={activeNoticesDatas} />
                                    </div>
                            }


                            <div className='absolute bottom-4 w-full'>
                                <Link href={`student/notices`}>
                                    <button className='bg-[#2091F9] mx-auto block rounded-lg hover: py-[3px] tracking-wider font-medium text-white px-3 text-clrprimary10 transition-all ease-linear duration-300 hover:text-'>
                                        All Notices
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainBody