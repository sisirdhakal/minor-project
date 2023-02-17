import Link from 'next/link'
import React from 'react'

function LecturesComp({ lectures }) {
    return (
        <>
            <div>
                {
                    lectures.map(item => {
                        const { id, cLass, class_name, totalLectureDays, subject_name } = item
                        return <div key={id} className="h-auto grid bg-white rounded-sm w-full items-center px-4 py-2" >
                            <div className='relative w-full h-full rounded-sm'>
                                <h1 className='text-primary-text text-lg mb-1 font-semibold capitalize'>Department of Electronics and Computer Engineering</h1>
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
                                        <h1 className='text-clrgrey1 mb-3 font-bold text-lg'>Total Lectures : <span >{totalLectureDays}</span></h1>

                                    </div>
                                    <div className='grid grid-cols-2  gap-8 items-center px-5'>
                                        <button className='bg-[#2091F9] rounded-lg hover: py-[3px] tracking-wider font-medium text-white px-3 text-clrprimary10 transition-all ease-linear duration-300 hover:text-'>
                                            Add
                                        </button>
                                        <button className='bg-[#2091F9] rounded-lg hover: py-[3px] tracking-wider font-medium text-white px-3 text-clrprimary10 transition-all ease-linear duration-300 hover:text-'>
                                            View
                                        </button>
                                    </div>
                                </div>

                                {/* <p className='text-secondary-text font-medium mb-3 h-12'>{subject_name}</p>
                                <Link href={`/teacher/attendance/${id}`}>
                                    <button className='bg-[#2091F9] rounded-lg hover: py-[3px] tracking-wider font-medium text-white px-3 text-clrprimary10 transition-all ease-linear duration-300 hover:text-'>
                                        Add
                                    </button>
                                </Link> */}
                            </div>
                        </div>

                    })
                }
            </div>
        </>
    )
}

export default LecturesComp