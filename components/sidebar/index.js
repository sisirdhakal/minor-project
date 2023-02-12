import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { sidebarOptions } from '../../utils/constants'
import { FaArrowCircleRight, FaArrowCircleLeft } from 'react-icons/fa'

import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux';
import { useSelector, useDispatch } from 'react-redux'
import SidebarOptions from '../sidebarOptions';

function Sidebar() {

    const router = useRouter();

    const { sidebarToggle: sidebar, sidebarUser } = useSelector(state => state.dashboard)
    const dispatch = useDispatch()
    const { sidebarToggle: setsidebar } = bindActionCreators(actionCreators, dispatch)


    const [pathname] = useState(router.pathname.split("/[id]")[0])

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
                    <SidebarOptions sidebar={sidebar} user={sidebarOptions[sidebarUser]} pathname={pathname} />
                </div>
            </div>
        </>
    )
}

export default Sidebar