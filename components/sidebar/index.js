import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'
import { dashboardStudent } from '../../utils/constants'

function Sidebar() {

    const { pathname } = useRouter();


    return (
        <>
            <div className='w-60 bg-white h-full'>
                <div className='relative w-[180px] mx-auto h-[80px]  rounded-sm'>
                    <Image
                        alt=''
                        priority
                        src={"/assets/images/test.svg"}
                        className='rounded-md object-fill'
                        fill
                        sizes="(min-width: 60em) 24vw,
                            (min-width: 28em) 45vw,
                            100vw"
                    />
                </div>
                <div className=''>
                    {
                        // <Link  href={url} >
                        dashboardStudent.map(item => {
                            const { id, name, icon, url } = item
                            return <div key={id} className={`mb-1 py-1 ${pathname === url ? ("bg-blue-400 text-white pl-8") : ("text-primary-text hover:pl-7 hover:bg-slate-300 pl-5")} flex items-center  justify-start  transition-all duration-300 ease-in-out `}>
                                <div className='relative mr-2 w-[20px] h-[20px]  rounded-sm'>
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
                                <p className='font-semibold text-lg  capitalize'>{name}</p>
                            </div>
                        })
                        // </Link>
                    }
                </div>
            </div>
        </>
    )
}

export default Sidebar