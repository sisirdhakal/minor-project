import React, { useEffect, useState } from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard';
import CollegeAdminHero from '../../../components/collgeadmin/collegeAdminHero';
import axios from 'axios';
import dayjs from 'dayjs'
import Link from 'next/link';
import DeleteApplicationModal from '../../../components/student/deleteModal';

export default function LeaveApplication({ cookie }) {

    const [applications, setapplications] = useState([])
    var LocalizedFormat = require('dayjs/plugin/localizedFormat')

    dayjs.extend(LocalizedFormat)

    const [showModal, setShowModal] = useState(false)
    const [activeId, setactiveId] = useState(null)

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/leave-request/my/`, {
                    withCredentials: true,
                    headers: {
                        "X-CSRFTOKEN": cookie.csrftoken
                    }
                })
                if (data) {
                    setapplications(data)
                }

            } catch (error) {
                console.log(error)
                if (error.response?.data.msg) {
                    toast.error(error.response.data.msg)
                }
            }

        }
        getData()
    }, [])

    const handleClick = (id) => {
        setactiveId(id)
        setShowModal(true)

    }


    return (
        <>
            <div>
                <CollegeAdminHero title={"Leave Application"} image={"/assets/images/routine.svg"} button={"Add"} url={"/student/leaveapplication/add"} />
            </div>

            <div className='grid grid-cols-1 gap-y-6' >
                {
                    applications?.map(item => {
                        const { id, approver_name, lecture_name, is_approved, requested_datetime, approved_datetime, is_archived, leaveStartDate, leaveEndDate, reason } = item;
                        return <div key={item.id} className='w-full px-12 py-2 bg-white rounded text-clrgrey1 font-medium'>
                            <div className='grid grid-cols-auto gap-x-10'>
                                <div>

                                    <div className=' flex items-center space-x-10 mb-3'>
                                        <p>From : {dayjs(leaveStartDate).format("LL")} </p>
                                        <p>To : {dayjs(leaveEndDate).format("LL")} </p>

                                    </div>
                                    <div className='grid grid-cols-autofirst mb-3 items-center'>
                                        <p className='w-24'>Lecture : </p>
                                        <p className='bg-background text-start px-4 py-1 rounded'>
                                            {lecture_name}
                                        </p>
                                    </div>
                                    <div className='grid grid-cols-autofirst'>
                                        <p className='w-24'>Reason : </p>
                                        <p className='bg-background px-4 py-1 h-14 rounded'>
                                            {reason}
                                        </p>
                                    </div>
                                </div>
                                <div className='w-44'>
                                    <p className='mb-2'>Requested At : <br /> {dayjs(requested_datetime).format("LL")} at <span className='lowercase'>{dayjs(requested_datetime).format('hh A')}</span>  </p>
                                    <p className='mb-2'>Approved At : <br />
                                        {
                                            approved_datetime.length > 1 ? <p>
                                                {dayjs(approved_datetime).format("LL")
                                                } at <span className='lowercase'>{dayjs(approved_datetime).format('hh A')}
                                                </span>
                                            </p>
                                                : null
                                        }
                                    </p>
                                    <p>Approved By : <br /> <span className='lowercase'>{approver_name}</span>  </p>
                                </div>
                            </div>
                            <div className='flex justify-center items-center space-x-16 mt-4'>
                                <Link href={`/student/leaveapplication/${id}`}>
                                    <button className='bg-[#2091F9] rounded-lg hover: py-[2px] tracking-wider font-medium capitalize text-white text-[14px] px-2 text-clrprimary10 transition-all ease-linear duration-300 w-[70px] disabled:cursor-not-allowed' >
                                        Edit
                                    </button>
                                </Link>

                                <button className='bg-red-500 rounded-lg hover: py-[2px] tracking-wider font-medium capitalize text-white text-[14px] px-2 text-clrprimary10 transition-all ease-linear duration-300 w-[70px] disabled:cursor-not-allowed' onClick={() => { handleClick(id) }}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    })
                }

            </div>

            <div>
                <DeleteApplicationModal showModal={showModal} setShowModal={setShowModal} cookie={cookie} id={activeId} />
            </div>

        </>
    )
}

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}

LeaveApplication.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};