import Link from 'next/link'
import React from 'react'

function ViewAttendance({ lectures }) {
    console.log(lectures)
    return (
        <>
            <div className='grid grid-cols-1 gap-y-2'>
                {
                    lectures.map(item => {
                        const { id, attendance, subject_name,teacher_name, presentDays, presentPercentage,totalLectureDays } = item
                        return <div key={id} className='relative bg-white px-4 py-2 w-full h-full rounded-sm grid grid-cols-2'>
                            <div>
                                <h1 className='text-primary-text text-[18px] font-semibold capitalize'>{subject_name}</h1>
                                <h1 className='text-clrgrey3 text-sm  font-semibold capitalize'>by {teacher_name}</h1>

                                <div className='flex space-x-3 items-center'>
                                    <div className={`rounded-full w-9 flex justify-center items-center h-9 border ${Number(presentPercentage) > 59 ? ("border-green-500 shadowGreen") : ("border-red-500 shadowRed")}`}>
                                        <p className='text-sm font-bold'>{presentPercentage}%</p>
                                    </div>
                                    <div>
                                        <p className='font-medium text-sm'> <span className='font-bold text-base'>{presentDays}</span> days present</p>
                                        <p className='font-medium text-sm'>out of <span className='font-bold text-base'>{totalLectureDays}</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className='grid grid-cols-9 gap-1 py-1'>
                                {
                                    attendance.map((item, index) => {
                                        const { date, status } = item
                                        return <div key={index} className={`border h-9 py-1 w-10 ${status ? "shadowGreen border-green-500" : "shadowRed border-red-500"}`}>
                                            <h1 className='text-[14px] leading-[14px] text-center font-medium'>{new Date(date).toLocaleString('default', { month: "short" })}</h1>
                                            <h1 className='text-[14px] leading-[14px] text-center font-semibold'>{new Date(date).getDate()}</h1>
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