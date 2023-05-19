import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../redux'
import toast from 'react-hot-toast';
import { useEffect } from 'react'
import DateComp from '../../common/DatePicker'
import CenteredLoading from '../../common/Loader'
import dayjs from 'dayjs'

function AddAttendance({ cookies }) {

    const { query: { id: lectureId, type } } = useRouter()
    const { attendanceDate } = useSelector(state => state.teachersData)
    const dispatch = useDispatch()
    const { addStudentList, setDayAttendance, resetStudentList } = bindActionCreators(actionCreators, dispatch)
    const { studentsList, dayAttendance } = useSelector(state => state.attendance)
    const router = useRouter()
    const [values, setValues] = useState(null)
    const [process, setProcess] = useState("submit")
    const [dateValue, setdateValue] = useState(new Date())

    useEffect(() => {
        resetStudentList()
    }, [dateValue])

    useEffect(() => {
        const getData = async () => {

            try {
                const { data } = await axios.get(`http://localhost:8000/api/add-attendance/${lectureId}/`, {
                    withCredentials: true,
                    headers: {
                        "X-CSRFTOKEN": cookies.csrftoken
                    }
                })
                if (data) {
                    setValues(data)
                }
            } catch (error) {
                if (error.response?.data.msg) {
                    toast.error(error.response.data.msg)
                }
            }

        }
        getData()
    }, [])


    const submitAttendance = async () => {
        try {
            setProcess("submitting ...")
            const date = dayjs(dateValue).format("YYYY/MM/DD")
            setDayAttendance(lectureId, date)
            const details = {
                date: date,
                attendance: [...studentsList]
            }
            const { data } = await axios.post(`http://localhost:8000/api/add-attendance/${lectureId}/`, details, {
                withCredentials: true,
                headers: {
                    "X-CSRFTOKEN": cookies.csrftoken
                }
            })
            if (data) {
                toast.success(data.msg)
                resetStudentList()
                router.push("/teacher/attendance")
            }

        } catch (error) {
            setProcess("submit")
            if (error.response?.data.msg) {
                toast.error(error.response.data.msg)
            }
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
                    <div className='mb-2 flex justify-end'>
                        {/* <DateComp /> */}
                        <input type="date" name="date" value={dateValue} onChange={(e) => setdateValue(e.target.value)} id="" />
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
                        !values ? (
                            <div className='py-6'>
                                <p className='text-secondary-text text-center text-lg font-medium'>Loading Students list ...</p>
                                <CenteredLoading />
                            </div>
                        ) : (
                            <div>
                                {values?.students.map(item => {
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
                                })}
                                <div className='mt-12 mb-3 flex items-center justify-center'>
                                    <button disabled={process === "submit" ? false : true} className='bg-[#2091F9] rounded-lg hover: py-[4px] tracking-wider font-medium capitalize text-white text-[20px] px-3 text-clrprimary10 transition-all ease-linear duration-300 w-52 disabled:cursor-not-allowed' onClick={submitAttendance}>
                                        {process}
                                    </button>
                                </div>
                            </div>
                        )

                    }

                </div>
            </div>
        </div>
    )
}

export default AddAttendance