import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddAttendance from '../../../components/attendance/AddAttendance';
import ViewAttendance from '../../../components/attendance/ViewAttendance';
import { DashboardLayout } from '../../../components/layout/dashboard';
import { actionCreators } from '../../../redux';

function AttendanceComp({ values, cookies, viewStudent }) {
    const { students, department_name, class_name, subject_name, totalLectureDays } = values

    const { query: { id: lectureId, type } } = useRouter()

    return (
        <div className=''>
            {/* <div className="h-auto bg-white  w-full items-center " > */}
            <div className='relative bg-white px-4 py-2 w-full h-full rounded-sm'>

                <h1 className='text-primary-text text-lg mb-3 font-semibold capitalize'>{department_name}</h1>
                <div className=' items-center flex'>
                    <h1 className='text-clrgrey1 mb-1 font-bold text-lg'>Class : <span >{class_name}</span></h1>
                </div>
                <div className=' items-center flex'>
                    <h1 className='text-clrgrey1 mb-3 font-bold text-lg'>{subject_name}</h1>
                </div>
            </div>
            {
                type === "add" ? (<AddAttendance values={values} cookies={cookies} />) : (<ViewAttendance values={viewStudent} />)
            }

        </div>
    )
}

export default AttendanceComp

export const getServerSideProps = async ({ req, query }) => {

    // console.log(query)
    const { id } = query
    let values = {}
    let viewStudent = {}
    try {
        const { data } = await axios.get(`http://localhost:8000/api/get-students-for-attendance/${id}/`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie
            }
        })
        const { data: viewStudentData } = await axios.get(`http://localhost:8000/api/view-lecture-attendance/${id}/`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie
            }
        })
        values = data;
        viewStudent = viewStudentData;
    } catch (error) {
        console.log(error)
    }

    return {
        props: {
            values: values,
            cookies: req.cookies,
            viewStudent: viewStudent
        }
    };
}

AttendanceComp.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};