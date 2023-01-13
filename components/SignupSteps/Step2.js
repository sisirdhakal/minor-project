import React from 'react'
import { BsFillCheckCircleFill } from 'react-icons/bs'

function Step2() {
    return (
        <>
            <div className='items-center flex mt-2 mb-4'>
                <BsFillCheckCircleFill className='text-[#0096C7]' />
                <p className='items-center text-[#0096C7] mx-1 font-semibold'>
                    {/* <span className='inline-block '> */}
                    {/* </span> */}
                    Add your details
                </p>
            </div>
            <form onSubmit={e => e.preventDefault()} action="" className='grid grid-cols-1 gap-y-2'>

                <div className=''>
                    <select
                        className='bg-background px-7 space-x-1 py-[0px] rounded-2xl flex justify-center items-center h-[42px] border-0 w-full cursor-pointer text-[#676B6B] font-medium focus:ring-0' placeholder='Courtesy Title' name='sort'
                    // value={sort}
                    // onChange={updateSort}
                    >
                        <option value="" disabled selected hidden>Courtesy Title</option>
                        <option value='price-lowest' className='cursor-pointer capitalize'>Citizenship</option>
                        <option value='price-highest' className='cursor-pointer'>Passport</option>

                    </select>
                </div>

                <div className='bg-background px-4 space-x-1 py-[2px] rounded-2xl flex justify-center items-center'>
                    <input
                        placeholder={`Your Name`}
                        // value={values.email}
                        // onChange={handleChange}
                        className='rounded-3xl text-gray-700 h-10 focus:ring-[#CAF0F8] border-[#CAF0F8] w-full bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide'
                        type="text"
                        name="text" />
                </div>

                <div className='bg-background px-4 space-x-1 py-[2px] rounded-2xl flex justify-center items-center'>
                    <input
                        placeholder={`Contact Number`}
                        // value={values.email}
                        // onChange={handleChange}
                        className='rounded-3xl text-gray-700 h-10 focus:ring-[#CAF0F8] border-[#CAF0F8] w-full bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide'
                        type="number"
                        name="text" />
                </div>

                <div className='bg-background px-4 space-x-1 py-[2px] rounded-2xl flex justify-center items-center'>
                    <input
                        placeholder={`Address`}
                        // value={values.email}
                        // onChange={handleChange}
                        className='rounded-3xl text-gray-700 h-10 focus:ring-[#CAF0F8] border-[#CAF0F8] w-full bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide'
                        type="text"
                        name="text" />
                </div>
            </form>
        </>
    )
}

export default Step2