import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { dashboardStudent } from '../../utils/constants'
import { FaArrowCircleRight, FaArrowCircleLeft } from 'react-icons/fa'

function Sidebar() {

    const router = useRouter();
    // const [pathname, setpathname] = useState("/")

    const [sidebar, setsidebar] = useState(true)

    return (
        <>
            <div className={`${sidebar ? ("w-60") : ("w-20")} overflow-hidden transition-all duration-300 ease-in-out  sticky top-0`}>
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

                    <button className={`absolute bg-red-200 z-50 transition-all ease-in-out duration-300 ml-48   mt-6`} >
                        {
                            sidebar ? (
                                <FaArrowCircleLeft onClick={() => { setsidebar(false) }} className='w-[32px] text-[#00B4D8] z-50 h-[32px]' />

                            ) : (

                                <FaArrowCircleRight onClick={() => { setsidebar(true) }} className='w-[32px] text-[#00B4D8] z-50 h-[32px]' />

                            )
                        }
                    </button>

                </div>
                {/* <div className=''>
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
                                        <p className='font-semibold text-lg  capitalize'>{name}</p>
                                    }

                                </div>
                            </Link>
                        })
                    }
                </div> */}
                <div className=" flex flex-col ">
                    {dashboardStudent.map((item) => {
                        return (
                            <Link key={item.id} href={item.url}>
                                <div
                                    key={item.id}
                                    className={`py-2 mb-1 transition-all ease-in-out duration-300 px-3 ${sidebar?(""):("pl-8")} flex gap-4 items-center cursor-pointer overflow-hidden  ${router.pathname === item.url
                                        ? 'bg-[#2091F9] '
                                        : ''
                                        } rounded-r-3xl hover:bg-black/20  `}
                                >
                                    <div className="">
                                        <div className={`flex-none transition-all ease-in-out duration-300 relative ${sidebar ? ("w-[20px] h-[20px] ") : ("w-[26px] h-[26px] ")}`}>
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