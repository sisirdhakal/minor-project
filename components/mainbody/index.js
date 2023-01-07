import React, { useState } from 'react'
import { BsPersonCircle, BsPersonFill, BsFillPersonFill, BsPerson } from 'react-icons/bs'
import { AiFillCaretDown } from 'react-icons/ai'
import { MdMessage } from 'react-icons/md'
import { statsOptions } from '../../utils/constants'
import Image from 'next/image'
import { books, collegeNotice, noticeOptions } from '../../utils/mockdata'
// import PieChart from './PieChart'


function MainBody() {

    const [visible, setvisible] = useState(false)

    const [active, setactive] = useState("college")

    return (
        <>
            <div className='w-full flex-1 '>

                <div className='grid lg:grid-cols-3 gap-6 mb-8'>

                    <div className="h-44 grid grid-cols-2 bg-white rounded-sm w-full items-center px-4" >
                        <div className='relative w-[114px]  h-[140px] flex justify-center items-center rounded-sm'>
                            <div className='border-[12px] rounded-full w-[114px] h-[114px] border-t-[#6DC9F7] rotate-[24deg] border-blue-400 bg-red-400 flex justify-center items-center'>
                                <p className='text-xl font-bold -rotate-[24deg] text-white'>72 / 80</p>
                            </div>
                        </div>
                        <div >
                            <h1 className='text-primary-text mb-3 font-bold text-lg'>Attendance</h1>
                            <p className='text-secondary-text font-medium mb-3 h-12'>body</p>
                            <button className='bg-[#2091F9] rounded-lg hover: py-[3px] tracking-wider font-medium text-white px-2 text-clrprimary10 transition-all ease-linear duration-300 hover:text-'>
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
                                    <button className='bg-[#2091F9] rounded-lg hover: py-[3px] tracking-wider font-medium text-white px-3 text-clrprimary10 transition-all ease-linear duration-300 hover:text-'>
                                        View Details
                                    </button>
                                </div>
                            </div>
                        })
                    }
                </div>
                <div className='grid lg:grid-cols-2 gap-10'>
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
                        <div className='lg:h-[460px] py-2 lg:py-0 px-5 bg-white w-full rounded-sm'>
                            {
                                books.map((book) => {
                                    const { id, name, date } = book
                                    return <div key={id} className=" flex py-1 items-center">

                                        <div className='relative w-[56px] mr-4 h-[56px] rounded-sm'>
                                            <Image
                                                alt=''
                                                priority
                                                src={"/assets/images/book.svg"}
                                                className='rounded-md'
                                                fill
                                                sizes="(min-width: 60em) 24vw,
                            (min-width: 28em) 45vw,
                            100vw"
                                            />

                                        </div>
                                        <div className='flex-1'>
                                            <p className='text-primary-text font-bold text-[16px]'>{name}</p>
                                            <p className='font-semibold text-[#48CAE4]'>Issued Date: {date} </p>
                                        </div>
                                    </div>
                                })
                            }
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
                        <div className='h-[460px] relative bg-white w-full rounded-sm'>
                            <div className='grid grid-cols-3'>

                                {
                                    noticeOptions.map(({ id, name }) => {
                                        return <button key={id} className={`font-bold transition-all ease-in-out duration-300  text-lg py-2 font-sans ${active.toLocaleLowerCase() === name.toLocaleLowerCase() ? ("border-b-[3px] text-primary-text border-secondary-text") : ("text-[#0096C7] border-b-[3px] border-white")}`} onClick={() => { setactive(name) }}>
                                            {name}
                                        </button>
                                    })
                                }

                            </div>
                            <div className='py-4 '>
                                {
                                    collegeNotice.map(item => {
                                        const { id, notice } = item
                                        return <div key={id} className=" px-5 py-3 ">
                                            <div className='flex items-center'>

                                                <MdMessage className='text-secondary-text mr-2 w-[40px] h-[40px]' />
                                                <p className='font-bold flex-1 text-primary-text'>{notice}</p>
                                            </div>
                                        </div>
                                    })
                                }


                            </div>
                            <div className='absolute bottom-4 w-full'>

                                <button className='bg-[#2091F9] mx-auto block rounded-lg hover: py-[3px] tracking-wider font-medium text-white px-3 text-clrprimary10 transition-all ease-linear duration-300 hover:text-'>
                                    All Notices
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainBody