import React, { useState } from 'react'
import { MdVpnKey } from 'react-icons/md'
import { BiShow, BiHide } from 'react-icons/bi';
import { BsFillCheckCircleFill } from 'react-icons/bs'

function Step4() {

    const [showpass, setshowpass] = useState(false);
    const [showconfirmpass, setshowconfirmpass] = useState(false);

    

    return (
        <>
            <div className='items-center flex mt-2 mb-4'>
                <BsFillCheckCircleFill className='text-[#0096C7]' />
                <p className='items-center text-[#0096C7] mx-1 font-semibold'>
                    {/* <span className='inline-block '> */}
                    {/* </span> */}
                    Final Confirmation
                </p>
            </div>
            <form onSubmit={e => e.preventDefault()} action="" className='grid grid-cols-1 gap-y-2'>

                <div className='bg-background px-4 space-x-1 py-[2px] rounded-2xl flex justify-center items-center'>
                    <input
                        placeholder={`Email`}
                        // value={values.email}
                        // onChange={handleChange}
                        className='rounded-3xl text-gray-700 h-10 focus:ring-[#CAF0F8] border-[#CAF0F8] w-full bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide'
                        type="email"
                        name="text"
                        required />
                </div>
                {/* password */}


                <div className='relative bg-background space-x-1 px-4 py-[2px] rounded-2xl flex justify-center items-center '>

                    {/* <MdVpnKey className='h-6 w-6 text-gray-900 cursor-pointer hover:text-gray-400 transition-all ease-in-out duration-300' /> */}

                    <div
                        onClick={() => setshowpass(!showpass)}
                        className=" flex absolute right-2 inset-y-0 items-center cursor-pointer pr-3 text-gray-700 transition-all duration-200 "
                    >
                        {showpass ? (
                            <BiShow className="w-6 h-6 antialiased" />
                        ) : (
                            <BiHide className="w-6 h-6 antialiased" />
                        )}
                    </div>

                    <input
                        placeholder='Password'
                        // value={values.password}
                        // onChange={handleChange}
                        className='rounded-3xl text-gray-700 h-10 focus:ring-[#CAF0F8] border-[#CAF0F8] w-full bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide'
                        type={showpass ? 'text' : 'password'}
                        name="password"
                        required />
                </div>


                {/* confirm password */}


                <div className='relative bg-background space-x-1 px-4 py-[2px] rounded-2xl flex justify-center items-center '>

                    {/* <MdVpnKey className='h-6 w-6 text-gray-900 cursor-pointer hover:text-gray-400 transition-all ease-in-out duration-300' /> */}

                    <div
                        onClick={() => setshowconfirmpass(!showconfirmpass)}
                        className=" flex absolute right-2 inset-y-0 items-center cursor-pointer pr-3 text-gray-700 transition-all duration-200 "
                    >
                        {showconfirmpass ? (
                            <BiShow className="w-6 h-6 antialiased" />
                        ) : (
                            <BiHide className="w-6 h-6 antialiased" />
                        )}
                    </div>

                    <input
                        placeholder='Confirm Password'
                        // value={values.password}
                        // onChange={handleChange} 
                        className='rounded-3xl text-gray-700 h-10 focus:ring-[#CAF0F8] border-[#CAF0F8] w-full bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide'
                        type={showpass ? 'text' : 'password'}
                        name="password"
                        required />
                </div>

                <button type='submit' className='w-full p-1 bg-primary-text rounded-2xl  transition-all duration-500 mt-2 ease-in-out text-white text-xl font-medium '  >Signup</button>

            </form>
        </>
    )
}

export default Step4