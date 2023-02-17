import axios from 'axios';
import Link from 'next/link';
import React from 'react'
import { useEffect } from 'react';
import { DashboardLayout } from '../../../components/layout/dashboard';
import LecturesComp from '../../../components/lectures';

function TeacherAttendance({ lectures }) {

    console.log(lectures)

    return (
        <>
            <div>
                <div className='grid grid-cols-2 gap-32'>
                    <button className='bg-white rounded-lg py-2 items-center shadow-md shadow-green-500 text-start flex px-5'>
                        <p className='text-primary-text font-bold text-[1rem] my-auto '>Theory Lectures</p>
                    </button>
                    <button className='bg-white rounded-lg py-2 text-start items-center px-5'>
                        <p className='text-primary-text my-auto font-bold text-[1rem]'>Practical Labs</p>
                    </button>
                </div>
                <div className='py-5'>
                    {
                        <LecturesComp lectures={lectures} />
                    }
                </div>
            </div>
        </>
    )
}

export default TeacherAttendance

export const getServerSideProps = async ({ req }) => {

    let lectures = []
    try {
        const { data } = await axios.get("http://localhost:8000/api/get-lectures/", {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie
            }
        })
        lectures = data;
    } catch (error) {
        console.log(error)
    }

    return {
        props: {
            lectures: lectures || []
        }
    };
}


TeacherAttendance.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};