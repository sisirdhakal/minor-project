import axios from 'axios'
import Link from 'next/link'
import React from 'react'

function ViewAttendance({ values }) {
    const { students, totalLectureDays } = values

    return (
        <>
            <div className='grid grid-cols-1 gap-y-2 mt-6 py-6'>
                {
                    students.map(item => {
                        const { id, attendances, full_name, rollNumber } = item
                        return <div key={id} className='relative bg-white px-4 py-2 w-full h-full rounded-sm grid grid-cols-2'>
                            <div>
                                <h1 className='text-primary-text text-[18px] font-semibold capitalize'>{full_name}</h1>
                                <h1 className='text-clrgrey3 text-sm  font-semibold capitalize'>{rollNumber}</h1>

                                <div>

                                </div>
                            </div>
                            <div className='flex space-x-3'>
                                {
                                    attendances.map(item => {
                                        const { date, status } = item
                                        return <div key={date} className={`border border-green-500 h-9 py-1 w-10 ${status ? "shadowGreen" : "shadowRed"}`}>
                                            <h1 className='text-[14px] leading-[14px] text-center font-medium'>{new Date(date).toLocaleString('default', { month: "short" })}</h1>
                                            <h1 className='text-[14px] leading-[14px] text-center font-semibold'>{new Date(date).getDay()}</h1>

                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    })
                }
            </div>
        </>
    )
}

export default ViewAttendance