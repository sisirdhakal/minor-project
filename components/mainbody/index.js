import React, { useState } from 'react'
import { BsPersonCircle, BsPersonFill, BsFillPersonFill, BsPerson } from 'react-icons/bs'
import { AiFillCaretDown } from 'react-icons/ai'
import { statsOptions } from '../../utils/constants'
import Image from 'next/image'
// import PieChart from './PieChart'


function MainBody() {

    const [visible, setvisible] = useState(false)

    return (
        <>
            <div className='w-full flex-1 py-5 px-12'>
                <div className='bg-white h-10 flex justify-between rounded-full py-1 px-8 mb-5'>
                    <p className='text-primary-text text-[16px] font-bold mt-[2px]'>PASCHIMANCHAL Campus, Pokhara</p>
                    {/* <div className='w-48 relative  transition-all duration-500 ease-in-out p-3 h-8 items-center flex justify-center rounded-xl cursor-pointer' > */}

                    <span className='rounded-full relative flex items-center py-[2px] px-[3px] justify-center border-2 border-secondary-text cursor-pointer' onClick={() => {
                        visible ? (setvisible(false)) : (setvisible(true))
                    }}>
                        <BsPerson className='w-6 h-6 text-secondary-text ' />
                        {visible && <div className='absolute flex items-center justify-center rounded-xl mt-[78px] z-20 bg-teal-400 w-44 h-8 hover:bg-teal-700 transition-all duration-500 ease-in-out'>
                            <button className='text-white '>Logout</button>
                        </div>}
                    </span>
                    {/* <p className="font-semibold text-white flex-1 text-center">name</p> */}
                    {/* <AiFillCaretDown className='text-white' /> */}


                    {/* </div> */}
                </div>
                <div className='grid grid-cols-3 gap-6 mb-8'>

                    <div className="h-44 grid grid-cols-2 bg-white rounded-sm w-full items-center px-4" >
                        <div className='relative w-[114px]  h-[140px] flex justify-center items-center rounded-sm'>
                            <div className='border-[12px] rounded-full w-[114px] h-[114px] border-t-[#6DC9F7] rotate-[24deg] border-blue-400 bg-red-400 flex justify-center items-center'>
                                <p className='text-xl font-bold -rotate-[24deg] text-white'>72 / 80</p>
                            </div>
                        </div>
                        <div >
                            <h1 className='text-primary-text mb-3 font-bold text-lg'>Attendance</h1>
                            <p className='text-secondary-text font-medium mb-3 h-12'>body</p>
                            <button className='bg-blue-400 rounded-lg hover: py-[3px] tracking-wider font-medium text-white px-3 text-clrprimary10 transition-all ease-linear duration-300 hover:text-'>
                                View Details
                            </button>
                        </div>
                    </div>

                    {
                        statsOptions.map(item => {
                            const { id, title, icon, body } = item

                            return <div key={id} className="h-44 grid grid-cols-2 bg-white rounded-sm w-full items-center px-4" >
                                <div className='relative w-[100px] h-[140px]  rounded-sm'>
                                    <Image
                                        alt=''
                                        priority
                                        src={icon}
                                        className='rounded-md'
                                        fill
                                        sizes="(min-width: 60em) 24vw,
                            (min-width: 28em) 45vw,
                            100vw"
                                    />
                                </div>
                                <div >
                                    <h1 className='text-primary-text mb-3 font-bold text-lg'>{title}</h1>
                                    <p className='text-secondary-text font-medium mb-3 h-12'>{body}</p>
                                    <button className='bg-blue-400 rounded-lg hover: py-[3px] tracking-wider font-medium text-white px-3 text-clrprimary10 transition-all ease-linear duration-300 hover:text-'>
                                        View Details
                                    </button>
                                </div>
                            </div>
                        })
                    }
                </div>
                <div className='grid grid-cols-2 gap-10'>
                    <div>
                        <div className='bg-white h-10 flex rounded-full px-5 items-center py-1 mb-3'>
                            <div className='relative w-[24px] mr-2 h-[24px]  rounded-sm'>
                                <Image
                                    alt=''
                                    priority
                                    src={"/assets/images/library.svg"}
                                    className='rounded-md'
                                    fill
                                    sizes="(min-width: 60em) 24vw,
                            (min-width: 28em) 45vw,
                            100vw"
                                />
                            </div>
                            <p className='text-primary-text font-bold mt-[2px]'>Library</p>
                        </div>
                        <div className='h-full bg-white w-full rounded-sm'>

                        </div>
                    </div>
                    <div>
                        <div className='bg-white h-10 flex rounded-full items-center px-5 py-1 mb-3'>
                            <div className='relative w-[28px] h-[36px] mr-2 rounded-sm'>
                                <Image
                                    alt=''
                                    priority
                                    src={"/assets/images/notes.svg"}
                                    className='rounded-md'
                                    fill
                                    sizes="(min-width: 60em) 24vw,
                            (min-width: 28em) 45vw,
                            100vw"
                                />
                            </div>
                            <p className='text-primary-text font-bold'>Notices</p>

                        </div>
                        <div className='h-full bg-white w-full rounded-sm'>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainBody