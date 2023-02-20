import axios from 'axios'
import Link from 'next/link'
import React from 'react'

function LecturesComp({ lectures }) {

    return (
        <>
            <div>
                {
                    lectures.map(item => {
                        const { id, class_name, totalLectureDays, totalLabDays, subject_name, department_name } = item
                        return <div key={id} className="h-auto grid bg-white rounded-sm w-full items-center px-4 py-2" >
                            <div className='relative w-full h-full rounded-sm'>
                                <h1 className='text-primary-text text-lg mb-1 font-semibold capitalize'>{department_name}</h1>
                                <div className='grid grid-cols-2'>
                                    <div className=' items-center flex'>
                                        <h1 className='text-clrgrey1 mb-3 font-bold text-lg'>Class : <span >{class_name}</span></h1>

                                    </div>
                                    <div className=' items-center px-5'>
                                        <h1 className='text-clrgrey1 mb-3 font-bold text-lg'>{subject_name}</h1>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <div className=' items-center flex'>
                                        <h1 className='text-clrgrey1 mb-3 font-bold text-lg'>Total Lectures : <span >{totalLectureDays ?? totalLabDays}</span></h1>

                                    </div>
                                    <div className='grid grid-cols-2  gap-8 items-center px-5'>
                                        <Link href={`/teacher/attendance/${id}?type=add`}>
                                            <button className='bg-[#2091F9] rounded-lg hover: py-[3px] tracking-wider w-full font-medium text-white text-xl px-3 text-clrprimary10 transition-all ease-linear duration-300 hover:text-'>
                                                Add
                                            </button>
                                        </Link>
                                        <Link href={`/teacher/attendance/${id}?type=view`}>
                                            <button className='bg-[#2091F9] rounded-lg hover: py-[3px] tracking-wider font-medium w-full text-xl text-white px-3 text-clrprimary10 transition-all ease-linear duration-300 hover:text-'>
                                                View
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    })
                }
            </div>
        </>
    )
}

export default LecturesComp