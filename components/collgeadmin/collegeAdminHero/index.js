import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'

export default function CollegeAdminHero({ title, button, image, url, parent }) {

    const [active, setactive] = useState("college")

    console.log(image, button, title)

    return (
        <>
            <div>
                <div className='bg-white w-full h-10 flex items-center justify-between px-2 rounded-sm py-1 lg:px-8 mb-8'>
                    <div className='flex items-center'>
                        <div className='relative w-[28px] h-[36px] mr-2 rounded-sm'>
                            <Image
                                alt=''
                                priority
                                src={image}
                                className='rounded-md'
                                fill
                                sizes="(min-width: 60em) 24vw,
                            (min-width: 28em) 45vw,
                            100vw"
                            />
                        </div>

                        <div className='flex items-center'>
                            {
                                parent ?
                                    <Link href={`/collegeadmin/${parent}`}>
                                        <span className='font-bold text-primary-text hover:text-red-600 transition-all ease-in-out duration-300 mr-4 capitalize'>
                                            {parent} <span className='ml-3'>/</span>
                                        </span>
                                    </Link> : null
                            }
                            <span className='font-bold text-primary-text transition-all ease-in-out duration-300'>
                                {title}
                            </span>
                        </div>

                    </div>
                    {

                        button ?
                            <Link href={url}>
                                <button className='bg-[#2091F9] rounded-lg hover: py-[2px] tracking-wider font-medium capitalize text-white text-[18px] px-2 text-clrprimary10 transition-all ease-linear duration-300 w-[140px] disabled:cursor-not-allowed'>
                                    {button}
                                </button>
                            </Link> : null
                    }
                </div>
            </div>
        </>
    )
}
