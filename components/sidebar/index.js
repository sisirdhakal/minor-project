import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { dashboardStudent } from '../../utils/constants'

function Sidebar() {
    return (
        <>
            <div className='w-60 bg-white h-full'>
                <div className='relative w-full h-[128px]  rounded-sm'>
                    <Image
                        alt=''
                        priority
                        src={"/assets/images/test.svg"}
                        className='rounded-md'
                        fill
                        sizes="(min-width: 60em) 24vw,
                            (min-width: 28em) 45vw,
                            100vw"
                    />
                </div>
                <div className=''>
                    {
                        dashboardStudent.map(item => {
                            const { id, name, url } = item
                            return <Link key={id} href={url} >
                                <div className='mb-2'>
                                    <p className='font-semibold capitalize'>{name}</p>
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