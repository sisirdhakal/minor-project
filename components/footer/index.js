import React from 'react'
import { AiOutlineCopyrightCircle } from 'react-icons/ai';

function Footer() {
    return (
        <>
            <div className="bg-[#222222]">
                <div className=" flex items-center justify-center px-10 border-[#464141] py-3 space-x-1">
                    <h5 className='text-white flex items-center space-x-2'>
                        <AiOutlineCopyrightCircle className="text-white/80 mx-1" />
                        {new Date().getFullYear()}
                        <span className='text-clrprimary5 tracking-wider'>- WRCMS |</span>
                    </h5>
                    <h5 className='text-white '>All rights reserved</h5>
                    {/* </div> */}
                </div>
            </div>
        </>
    )
}

export default Footer