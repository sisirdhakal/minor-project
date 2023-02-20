import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DashboardLayout } from '../../../components/layout/dashboard';
import { actionCreators } from '../../../redux';

function AttendanceComp({ values }) {
    const { students, department_name, class_name, subject_name, totalLectureDays } = values

    const { query } = useRouter()
    const dispatch = useDispatch()
    const { addStudentList } = bindActionCreators(actionCreators, dispatch)
    const { studentsList } = useSelector(state => state.attendance)

    const submitAttendance = async () => {
        try {

        } catch (error) {

        }
    }

    useEffect(() => {
        console.log(studentsList)
    }, [studentsList])

    const pushStudent = (e) => {
        let status = e.target.checked ? 1 : 0
        addStudentList(Number(e.target.id), status)
    }

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
            <div className='h-full py-5'>

                <div className='bg-white h-full py-3 px-8'>
                    <div className='mb-2 flex justify-end'>
                        <p className='text-primary-text text-lg font-semibold'> Date : {new Date().toLocaleDateString('en-GB').split('/').reverse().join('/')}</p>
                    </div>
                    <div>
                        <div className="grid grid-cols-3 mb-3">
                            <div className='px-4'>
                                <p className='text-primary-text capitalize font-medium text-lg'>
                                    roll Number
                                </p>
                            </div>
                            <div className='px-4'>
                                <p className='text-primary-text capitalize  font-medium text-lg'>
                                    full name
                                </p>
                            </div>
                            <div>
                                <p className='text-clrgrey1 capitalize  font-medium text-lg'>

                                </p>
                            </div>
                        </div>
                    </div>
                    {
                        students.map(item => {
                            const { id, rollNumber, full_name } = item
                            return <div key={id} className="grid grid-cols-3 mb-1">
                                <div>
                                    <p className='text-clrgrey1 font-medium text-lg'>
                                        {rollNumber}
                                    </p>
                                </div>
                                <div>
                                    <p className='text-clrgrey1  font-medium text-lg'>
                                        {full_name}
                                    </p>
                                </div>
                                <div>
                                    <form action="" onSubmit={(e) => e.preventDefault()}>
                                        <input
                                            type="checkbox"
                                            className=" rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 cursor-pointer"
                                            id={id}
                                            onChange={pushStudent}
                                            name="studentAttendance"

                                        />
                                    </form>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default AttendanceComp

export const getServerSideProps = async ({ req, query }) => {

    // console.log(query)
    const { id } = query
    let values = {}
    try {
        const { data } = await axios.get(`http://localhost:8000/api/get-students-for-attendance/${id}/`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie
            }
        })
        values = data
    } catch (error) {
        console.log(error)
    }

    return {
        props: {
            values: values
        }
    };
}

AttendanceComp.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};