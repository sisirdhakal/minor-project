import React, { useState } from 'react'
import { BsPersonCircle, BsPersonFill, BsFillPersonFill, BsPerson } from 'react-icons/bs'
import { AiFillCaretDown } from 'react-icons/ai'


function MainBody() {

    const [visible, setvisible] = useState(false)

    return (
        <>
            <div className='w-full flex-1 py-5 px-12'>
                <div className='bg-white h-10 flex justify-between rounded-full py-1 px-8'>
                    <p className='text-primary-text text-[16px] font-bold mt-[2px]'>PASCHIMANCHAL Campus, Pokhara</p>
                    {/* <div className='w-48 relative  transition-all duration-500 ease-in-out p-3 h-8 items-center flex justify-center rounded-xl cursor-pointer' > */}

                    <span className='rounded-full relative flex items-center py-[2px] px-[3px] justify-center border-2 border-secondary-text cursor-pointer' onClick={() => {
                        visible ? (setvisible(false)) : (setvisible(true))
                    }}>
                        <BsPerson className='w-6 h-6 text-secondary-text ' />
                        {visible && <div className='absolute flex items-center justify-center rounded-xl mt-[78px] z-20 bg-teal-400 w-44 h-8 hover:bg-teal-700 transition-all duration-500 ease-in-out'>
                            <button className='text-white '>Logout</button>
                        </div>}
                    </span>
                    {/* <p className="font-semibold text-white flex-1 text-center">name</p> */}
                    {/* <AiFillCaretDown className='text-white' /> */}


                    {/* </div> */}
                </div>
                <div>

                </div>
            </div>
        </>
    )
}

export default MainBody