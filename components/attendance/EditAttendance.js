import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../redux'
import toast from 'react-hot-toast';
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import CenteredLoading from '../loader'
import DateComp from '../common/DatePicker'
import dayjs from 'dayjs'

function EditAttendance({ cookies }) {

    const { query: { id: lectureId } } = useRouter()
    const [date, setdate] = useState(dayjs(new Date()).format("YYYY-MM-DD"))
    const dispatch = useDispatch()
    const { addStudentList, setDayAttendance } = bindActionCreators(actionCreators, dispatch)
    const { studentsList, dayAttendance } = useSelector(state => state.attendance)
    const router = useRouter()
    const [values, setValues] = useState(null)
    const [message, setmessage] = useState(false)
    // useEffect(() => {
    const getData = async (date, value) => {
        setmessage(false)
        setValues(null)
        setdate(value)
        try {
            const { data } = await axios.get(`http://localhost:8000/api/edit-attendance/${date}/`, {
                withCredentials: true,
                headers: {
                    "X-CSRFTOKEN": cookies.csrftoken
                }
            })
            if (data) {
                setValues(data)
            }
        } catch (error) {
            setmessage(true)
            setValues(null)
        }

    }
    useEffect(() => {
        getData(lectureId + "-" + dayjs(new Date()).format("YYYY-MM-DD"), dayjs(new Date()).format("YYYY-MM-DD"))
    }, [])



    const submitAttendance = async () => {
        try {
            setDayAttendance(lectureId, date)
            const details = {
                lecture_id: dayAttendance.lecture_id,
                date: "2023/02/12",
                attendance: [...studentsList]
            }
            const { data } = await axios.post(`http://localhost:8000/api/add-attendance/`, details, {
                withCredentials: true,
                headers: {
                    "X-CSRFTOKEN": cookies.csrftoken
                }
            })
            if (data) {
                toast.success(data.msg)
                router.push("/teacher/attendance")
            }

        } catch (error) {
            console.log(error)
        }
    }

    const pushStudent = (e) => {
        let status = e.target.checked ? 1 : 0
        addStudentList(Number(e.target.id), status)
    }
    return (
        <div>
            <div className='h-full py-5'>

                <div className='bg-white h-full py-3 px-8'>
                    <div className=' flex justify-end'>
                        <DateComp getData={getData} lectureId={lectureId} />
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
                        // start && <div>
                        //     {
                        message ? (
                            <div className='py-6'>
                                <p className='text-[#ff0000]  text-center text-xl font-medium'>No lecture was taken on the Date : {date}</p>

                            </div>
                        ) :
                            !values ? (
                                <div className='py-6'>
                                    <p className='text-secondary-text text-center text-lg font-medium'>Loading Students list ...</p>
                                    <CenteredLoading />
                                </div>
                            ) : (
                                <div>
                                    {values?.map(item => {
                                        const { id, rollNumber, full_name, attendance
                                        } = item
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
                                                        checked={attendance?.status ?? false}
                                                        onChange={pushStudent}
                                                        name="studentAttendance"

                                                    />
                                                </form>
                                            </div>
                                        </div>
                                    })}
                                    <div className='mt-12 mb-3 flex items-center justify-center'>
                                        <button className='bg-[#2091F9] rounded-lg hover: py-[4px] tracking-wider font-medium text-white text-[20px] px-3 text-clrprimary10 transition-all ease-linear duration-300 w-40' onClick={submitAttendance}>
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            )

                        // }
                        // </div>
                    }


                </div>
            </div >
        </div >
    )
}

export default EditAttendance