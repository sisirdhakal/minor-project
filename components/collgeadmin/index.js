import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'


function CollegeAdmin({ cookie }) {
    const dispatch = useDispatch()
    const initialValues = {}
    const [values, setvalues] = useState(initialValues)



    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/admin/dashboard/`, {
                    withCredentials: true,
                    headers: {
                        "X-CSRFTOKEN": cookie.csrftoken
                    }
                })
                if (data) {
                    setvalues(data)
                }

            } catch (error) {
                if (error.response?.data.msg) {
                    toast.error(error.response.data.msg)
                }
            }

        }
        getData()
    }, [])


    return (
        <div className='grid grid-cols-4 gap-5'>
            <div className='bg-gradient-to-r from-[#26D0CE] to-[#1A2980] h-[130px] rounded-md p-2'>
                <img src='/assets/images/student.svg' className='w-[40px] h-[45px]'/>
                <div className='text-end'>
                    <h1 className='text-white font-bold text-5xl'>{values.students}</h1>
                    <p className='text-white'>STUDENTS</p>
                </div>
            </div>
            <div className='bg-gradient-to-r from-[#FF512F] to-[#DD2476] h-[130px] rounded-md p-2'>
                <img src='/assets/images/teacher.svg' className='w-[40px] h-[45px]'/>
                <div className='text-end'>
                    <h1 className='text-white font-bold text-5xl'>{values.teachers}</h1>
                    <p className='text-white'>TEACHERS</p>
                </div>
            </div>
            <div className='bg-gradient-to-r from-[#E7E9BB] to-[#403B4A] h-[130px] rounded-md p-2'>
                <img src='/assets/images/parent.svg' className='w-[40px] h-[45px]'/>
                <div className='text-end'>
                    <h1 className='text-white font-bold text-5xl'>{values.parents}</h1>
                    <p className='text-white'>PARENTS</p>
                </div>
            </div>
            <div className='bg-gradient-to-r from-[#DA22FF] to-[#9733EE] h-[130px] rounded-md p-2'>
                <img src='/assets/images/student.svg' className='w-[40px] h-[45px]'/>
                <div className='text-end'>
                    <h1 className='text-white font-bold text-5xl'>{values.alumni}</h1>
                    <p className='text-white'>ALUMNI</p>
                </div>
            </div>
            <div className='bg-gradient-to-r from-[#fc6767] to-[#ec008c] h-[130px] rounded-md p-2'>
                <img src='/assets/images/attendance.svg' className='w-[40px] h-[45px]'/>
                <div className='text-end'>
                    <h1 className='text-white font-bold text-5xl'>{values.graduated_batches}</h1>
                    <p className='text-white'>BATCH GRADUATED</p>
                </div>
            </div>
            <div className='bg-gradient-to-r from-[#ACBB78] to-[#799F0C] h-[130px] rounded-md p-2'>
                <img src='/assets/images/exam.svg' className='w-[40px] h-[45px]'/>
                <div className='text-end'>
                    <h1 className='text-white font-bold text-5xl'>{values.departments}</h1>
                    <p className='text-white'>DEPARTMENTS</p>
                </div>
            </div>
            <div className='bg-gradient-to-r from-[#159957] to-[#155799] h-[130px] rounded-md p-2'>
                <img src='/assets/images/program.svg' className='w-[40px] h-[45px]'/>
                <div className='text-end'>
                    <h1 className='text-white font-bold text-5xl'>{values.programs}</h1>
                    <p className='text-white'>PROGRAMS OFFERED</p>
                </div>
            </div>
        </div>
    )
}

export default CollegeAdmin