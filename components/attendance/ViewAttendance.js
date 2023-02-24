import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import CenteredLoading from '../loader'

function ViewAttendance({ cookies }) {
    // const { students, totalLectureDays } = values
    const { query: { id: lectureId, type } } = useRouter()
    const [values, setValues] = useState(null)

    useEffect(() => {
        const getData = async () => {

            try {
                const { data } = await axios.get(`http://localhost:8000/api/view-lecture-attendance/${lectureId}/`, {
                    withCredentials: true,
                    headers: {
                        "X-CSRFTOKEN": cookies.csrftoken
                    }
                })
                if (data) {
                    setValues(data)
                }
            } catch (error) {
                console.log(error)
            }

        }
        getData()
    }, [])

    return (
        <>
            <div className='grid grid-cols-1 gap-y-2 mt-6 py-6'>
                {
                    !values ? (
                        <div className='py-6 bg-white'>
                            <p className='text-secondary-text text-center text-lg font-medium'>Loading Students list ...</p>
                            <CenteredLoading />
                        </div>
                    ) : (
                        values?.students?.map(item => {
                            const { id, attendances, full_name, rollNumber, presentDays, presentPercentage } = item
                            return <div key={id} className='relative bg-white px-4 py-2 w-full h-full rounded-sm grid grid-cols-2'>
                                <div>
                                    <h1 className='text-primary-text text-[18px] font-semibold capitalize'>{full_name}</h1>
                                    <h1 className='text-clrgrey3 text-sm  font-semibold capitalize'>{rollNumber}</h1>

                                    <div className='flex space-x-3 items-center'>
                                        <div className={`rounded-full w-9 flex justify-center items-center h-9 border ${Number(presentPercentage) > 59 ? ("border-green-500 shadowGreen") : ("border-red-500 shadowRed")}`}>
                                            <p className='text-sm font-bold'>{presentPercentage}%</p>
                                        </div>
                                        <div>
                                            <p className='font-medium text-sm'> <span className='font-bold text-base'>{presentDays}</span> days present</p>
                                            <p className='font-medium text-sm'>out of <span className='font-bold text-base'>{values?.totalLectureDays}</span></p>
                                        </div>
                                    </div>
                                </div>
                                <div className='grid grid-cols-9 gap-1 py-1'>
                                    {
                                        attendances.map((item, index) => {
                                            const { date, status } = item
                                            return <div key={index} className={`border h-9 py-1 w-10 ${status ? "shadowGreen border-green-500" : "shadowRed border-red-500"}`}>
                                                <h1 className='text-[14px] leading-[14px] text-center font-medium'>{new Date(date).toLocaleString('default', { month: "short" })}</h1>
                                                <h1 className='text-[14px] leading-[14px] text-center font-semibold'>{new Date(date).getDate()}</h1>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        }))
                }
            </div>
        </>
    )
}

export default ViewAttendance