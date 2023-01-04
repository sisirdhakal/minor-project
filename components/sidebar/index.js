import Image from 'next/image'
import React from 'react'

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
                <div>
                        
                </div>
            </div>
        </>
    )
}

export default Sidebar