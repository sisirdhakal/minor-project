import React, { useState } from 'react'
import { BsPerson } from 'react-icons/bs'

export default function Topbar() {

    const [visible, setvisible] = useState(false)

    return (
        <>
            <div className='h-20 sticky bg-[#CAF0F8] top-0 z-20  items-center flex justify-center'>

                <div className='bg-white w-full h-10 px-2 flex justify-between rounded-full py-1 lg:px-8 mb-2'>
                    <p className='text-primary-text text-[14px] lg:text-[16px] mt-1 font-bold lg:mt-[2px]'>PASCHIMANCHAL Campus, Pokhara</p>
                    {/* <div className='w-48 relative  transition-all duration-500 ease-in-out p-3 h-8 items-center flex justify-center rounded-xl cursor-pointer' > */}

                    <span className='rounded-full relative flex items-center py-[1px] px-[3px] lg:px-[3px] justify-center border-2 border-secondary-text cursor-pointer' onClick={() => {
                        visible ? (setvisible(false)) : (setvisible(true))
                    }}>
                        <BsPerson className='w-[22px] h-5 lg:w-6 lg:h-6  text-secondary-text ' />
                        {visible && <div className='absolute flex items-center justify-center rounded-xl mt-[78px] z-20 bg-teal-400 w-44 h-8 hover:bg-teal-700 transition-all duration-500 ease-in-out'>
                            <button className='text-white '>Logout</button>
                        </div>}
                    </span>
                    {/* <p className="font-semibold text-white flex-1 text-center">name</p> */}
                    {/* <AiFillCaretDown className='text-white' /> */}


                    {/* </div> */}
                </div>
            </div>
        </>
    )
}
