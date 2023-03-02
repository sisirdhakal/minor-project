import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import { MdMessage } from 'react-icons/md'
import { collegeNotice, noticeOptions } from '../../utils/mockdata'

export default function NoticeHero({ title }) {

    const [active, setactive] = useState("college")

    return (
        <>
            <div>
                <div className='bg-white w-full h-10 flex items-center justify-between px-2 rounded-sm py-1 lg:px-8 mb-8'>
                    <div className='flex items-center'>
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
                        {
                            title ? (
                                <Link href={"/student/notices"}>
                                    <span className='font-bold text-primary-text hover:text-red-600 transition-all ease-in-out duration-300'>
                                        Notices
                                    </span>
                                </Link>
                            ) : (
                                <span className='font-bold text-primary-text transition-all ease-in-out duration-300'>
                                    Notices
                                </span>
                            )
                        }
                    </div>
                    <button className='bg-[#2091F9] rounded-lg hover: py-[2px] tracking-wider font-medium capitalize text-white text-[18px] px-2 text-clrprimary10 transition-all ease-linear duration-300 w-[140px] disabled:cursor-not-allowed'>
                        Add Notice
                    </button>
                </div>
            </div>
        </>
    )
}
