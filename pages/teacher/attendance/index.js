import axios from 'axios';
import Link from 'next/link';
import React from 'react'
import { useEffect } from 'react';
import { DashboardLayout } from '../../../components/layout/dashboard';

function TeacherAttendance({ data }) {

    return (
        <>
            <div>
                <div>
                    <h1 className='text-primary-text mb-3 font-bold text-lg'>My Lectures</h1>
                </div>
                {
                    data.map(item => {
                        const { id, cLass, class_name, totalLectureDays, subject_name } = item
                        return <div key={id} className="h-auto grid bg-white rounded-sm w-full items-center px-4" >
                            <div className='relative w-full h-full rounded-sm'>
                                <h1 className='text-primary-text mb-3 font-bold text-lg'>{class_name}</h1>
                                <p className='text-secondary-text font-medium mb-3 h-12'>{subject_name}</p>
                                <Link href={`/teacher/attendance/${id}`}>
                                    <button className='bg-[#2091F9] rounded-lg hover: py-[3px] tracking-wider font-medium text-white px-3 text-clrprimary10 transition-all ease-linear duration-300 hover:text-'>
                                        Add
                                    </button>
                                </Link>
                            </div>
                        </div>

                    })
                }
            </div>
        </>
    )
}

export default TeacherAttendance

export const getServerSideProps = async ({ req }) => {
    const { data } = await axios.get("http://localhost:8000/api/get-lectures/", {
        withCredentials: true,
        headers: {
            Cookie: req.headers.cookie
        }
    })
    return {
        props: {
            data: data || []
        }
    };
}

TeacherAttendance.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};