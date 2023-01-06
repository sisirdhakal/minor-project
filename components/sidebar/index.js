import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { dashboardStudent } from '../../utils/constants'
import { FaArrowCircleRight, FaArrowCircleLeft } from 'react-icons/fa'

function Sidebar() {

    const { pathname } = useRouter();

    const [sidebar, setsidebar] = useState(true)

    return (
        <>
            <div className={`${sidebar ? ("w-60") : ("w-24")} transition-all duration-300 ease-in-out  sticky top-0`}>
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

                    <button className={`absolute right-0 z-50 transition-all ease-in-out duration-300 ${sidebar ? ("-mr-12") : ("-mr-8")}  mt-6`} >
                        {
                            sidebar ? (
                                <FaArrowCircleLeft onClick={() => { setsidebar(false) }} className='w-[32px] text-[#00B4D8] h-[32px]' />

                            ) : (

                                <FaArrowCircleRight onClick={() => { setsidebar(true) }} className='w-[32px] text-[#00B4D8] h-[32px]' />

                            )
                        }
                    </button>

                </div>
                <div className=''>
                    {

                        dashboardStudent.map(item => {
                            const { id, name, icon, url } = item
                            return <Link key={id} href={url} >
                                <div className={`mb-1 py-1 ${pathname === url ? ("bg-[#2091F9] text-white pl-8") : ("text-primary-text hover:pl-7 hover:bg-slate-300 pl-5")} group flex items-center  justify-start  transition-all duration-300 ease-in-out h-10 `}>
                                    <div className={`relative  transition-all ease-in-out duration-300 mr-2 ${sidebar ? ("w-[20px] h-[20px] ") : ("w-[26px] h-[26px] ")}  rounded-sm`}>
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
                                        {
                                            !sidebar && <p className={`font-semibold group-hover:opacity-100 ${pathname === url ? (" text-red-400 ") : ("text-secondary-text")} opacity-0 absolute  pl-10 truncate capitalize text-lg text-end`}>
                                                {name}
                                            </p>
                                        }
                                    </div>
                                    {
                                        sidebar && <p className='font-semibold text-lg  capitalize'>{name}</p>
                                    }

                                </div>
                            </Link>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Sidebar