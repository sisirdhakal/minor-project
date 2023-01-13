import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function NoticeHero({ title }) {
    return (
        <div className='bg-white w-full h-10 flex items-center px-2 rounded-full py-1 lg:px-8 mb-8'>
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

            <span className='font-bold text-secondary-text ml-2 '>
                - {title}
            </span>
        </div>
    )
}
