import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { dashboardStudent } from '../../utils/constants'
import { FaArrowCircleRight, FaArrowCircleLeft } from 'react-icons/fa'

import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux';
import { useSelector, useDispatch } from 'react-redux'

function Sidebar() {

    const router = useRouter();

    const { sidebarToggle: sidebar } = useSelector(state => state.dashboard)
    const dispatch = useDispatch()
    const { sidebarToggle: setsidebar } = bindActionCreators(actionCreators, dispatch)

    return (
        <>
            <div className={`${sidebar ? ("w-60") : ("w-20")}  transition-all duration-300 ease-in-out  sticky top-0`}>
                <div className={`relative ${sidebar ? ("w-[180px]") : ("w-[72px]")}  mx-auto h-[80px]  rounded-sm`}>
                    {
                        sidebar ? (<Image
                            alt=''
                            priority
                            src={"/assets/images/test.svg"}
                            className='rounded-md object-fill'
                            fill
                            sizes="(min-width: 60em) 24vw,
                            (min-width: 28em) 45vw,
                            100vw"
                        />) : (
                            <Image
                                alt=''
                                priority
                                src={"/assets/images/logo.svg"}
                                className='rounded-md object-fill'
                                fill
                                sizes="(min-width: 60em) 24vw,
                            (min-width: 28em) 45vw,
                            100vw"
                            />
                        )
                    }

                    <button className={`absolute z-50 transition-all ease-in-out duration-300  ${sidebar ? ("-right-12") : ("-right-6")}  mt-6`} >
                        {
                            sidebar ? (
                                <FaArrowCircleLeft onClick={() => { setsidebar(false) }} className='w-[32px] text-[#00B4D8] z-50 h-[32px]' />

                            ) : (

                                <FaArrowCircleRight onClick={() => { setsidebar(true) }} className='w-[32px] text-[#00B4D8] z-50 h-[32px]' />

                            )
                        }
                    </button>

                </div>
                <div className=" flex flex-col">
                    {dashboardStudent.map((item) => {
                        return (
                            <Link key={item.id} href={item.url}>
                                <div
                                    key={item.id}
                                    className={`py-2 mb-1 transition-all ease-in-out duration-300 px-3 ${sidebar ? ("hover:pl-7 pl-5") : ("pl-6 hover:pl-8")} flex gap-4 items-center cursor-pointer   ${router.pathname === item.url ? ("bg-[#2091F9] text-white pl-7") : ("text-primary-text  hover:bg-slate-300 ")} z-40 group rounded-r-3xl `}
                                >
                                    <div className="">
                                        <div className={`flex-none transition-all ease-in-out duration-300 relative ${sidebar ? ("w-[22px] h-[22px] ") : ("w-[26px] h-[26px] mr-2")}`}>
                                            <Image
                                                alt=''
                                                priority
                                                src={item.icon}
                                                className='rounded-md'
                                                fill
                                                sizes="(min-width: 60em) 24vw,
                            (min-width: 28em) 45vw,
                            100vw"
                                            />
                                            {
                                                !sidebar && <p className={`font-semibold group-hover:opacity-100 ${router.pathname === item.url ? (" text-red-400 ") : ("text-secondary-text")} opacity-0 pl-8 absolute  z-50 truncate capitalize text-lg text-end`}>
                                                    {item.name}
                                                </p>
                                            }
                                        </div>
                                    </div>
                                    <div className="overflow-hidden whitespace-nowrap text-[16px] font-semibold capitalize ">
                                        {item.name}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    )
}

export default Sidebar