import React, { useEffect, useState } from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard';
import CollegeAdminHero from '../../../components/collgeadmin/collegeAdminHero';
import axios from 'axios';
import dayjs from 'dayjs'

export default function LeaveApplication({ cookie }) {

    const [applications, setapplications] = useState([])

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


    const test = {
        "id": 2,
        "student": 4,
        "student_name": "Sujan Sigdel",
        "approver_name": " ",
        "lecture_name": "BCT076 - Database Management System - 6 semester",
        "is_approved": false,
        "requested_datetime": "09 May 2023, 23:26:20",
        "approved_datetime": " ",
        "is_archived": false,
        "leaveStartDate": "10 May 2023",
        "leaveEndDate": "12 May 2023",
        "reason": "i am sick again3"
    }


    return (
        <>
            <div>
                <CollegeAdminHero title={"Leave Application's"} image={"/assets/images/routine.svg"} button={"Add"} url={"/student/leaveapplication/add"} />
            </div>

            <div className='grid grid-cols-1 gap-y-6' >
                {
                    applications?.map(item => {
                        const { id, approver_name, lecture_name, is_approved, requested_datetime, approved_datetime, is_archived, leaveStartDate, leaveEndDate, reason } = item;
                        return <div key={item.id} className='w-full px-4 py-2 bg-white rounded'>
                            <div>
                                <p>From : {dayjs(requested_datetime).date()} </p>
                            </div>
                        </div>
                    })
                }
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