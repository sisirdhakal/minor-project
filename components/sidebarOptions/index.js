import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { dashboardStudent } from '../../utils/constants';

export default function SidebarOptions(props) {

    const { sidebar, pathname, user } = props

    return (
        <>

            {user?.map((item) => {
                return (
                    <Link key={item.id} href={item.url}>
                        <div
                            key={item.id}
                            className={`py-2 mb-1 transition-all ease-in-out duration-300 px-3 ${sidebar ? ("hover:pl-7 pl-5") : ("pl-6 hover:pl-8")} flex gap-4 items-center cursor-pointer   ${pathname === item.url ? ("bg-[#2091F9] text-white pl-7") : ("text-primary-text  hover:bg-slate-300 ")} z-40 group rounded-r-3xl `}
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
                                        !sidebar && <p className={`font-semibold group-hover:opacity-100 ${pathname === item.url ? (" text-red-400 ") : ("text-secondary-text")} opacity-0 pl-8 absolute  z-50 truncate capitalize text-lg text-end`}>
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

        </>
    )
}
