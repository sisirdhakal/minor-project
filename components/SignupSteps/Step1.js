import React, { useEffect, useState } from 'react'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../redux';
const date_regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

function Step1() {

    const dispatch = useDispatch()
    const { verifyData } = bindActionCreators(actionCreators, dispatch)

    const { signUpDetails: { step1, placeholder1 } } = useSelector(state => state.auth)
    const { verifyDetails } = useSelector(state => state.signup)

    const handleChange = (e) => {
        verifyData(e)
    }

    useEffect(() => {
        // console.log(verifyDetails)
    }, [verifyDetails])


    return (
        <>
            <div className='items-center flex mt-2 mb-4'>
                <BsFillCheckCircleFill className='text-[#0096C7]' />
                <p className='items-center text-[#0096C7] mx-1 font-semibold'>
                    {step1}
                </p>
            </div>
            <form onSubmit={e => e.preventDefault()} action="" className='grid grid-cols-1 gap-y-2'>

                <div className='bg-background px-4 space-x-1 py-[2px] rounded-2xl flex justify-center items-center'>
                    <input
                        placeholder={`${placeholder1}`}
                        value={verifyDetails.text}
                        onChange={handleChange}
                        className='rounded-3xl text-gray-700 h-10 focus:ring-[#CAF0F8] border-[#CAF0F8] w-full bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide'
                        type="text"
                        name="text" />
                </div>

                <div className=''>
                    <select
                        className='bg-background px-7 space-x-1 py-[0px] rounded-2xl flex justify-center items-center h-[42px] border-0 w-full cursor-pointer text-[#676B6B] font-medium focus:ring-0' placeholder='ID Type' name='idType'
                        value={verifyDetails.idType}
                        onChange={handleChange}
                    >
                        <option value="" disabled defaultValue>ID Type</option>
                        <option value='Citizenship' className='cursor-pointer capitalize'>Citizenship</option>
                        <option value='Passport' className='cursor-pointer'>Passport</option>

                    </select>
                </div>
                <div className='bg-background px-4 space-x-1 py-[2px] rounded-2xl flex justify-center items-center'>
                    <input
                        placeholder={`ID Number`}
                        value={verifyDetails.idNumber}
                        onChange={handleChange}
                        className='rounded-3xl text-gray-700 h-10 focus:ring-[#CAF0F8] border-[#CAF0F8] w-full bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide'
                        type="text"
                        name="idNumber" />
                </div>
                <div className='bg-background pl-4 space-x-1 py-[2px] rounded-2xl flex justify-center items-center font-medium'>
                    <input
                        placeholder={`Date of Birth : yyyy/mm/dd`}
                        value={verifyDetails.dobStudent}
                        onChange={handleChange}
                        className='rounded-3xl h-10 focus:ring-[#CAF0F8] border-[#CAF0F8] w-full bg-background focus:border-[#CAF0F8] text-[#676B6B] placeholder:font-medium placeholder:tracking-wide'
                        type={"text"}
                        // onFocus={(e) => (e.target.type = "date")}
                        // onBlur={(e) => (e.target.type = "text")}
                        name="dobStudent" />
                </div>
            </form>
        </>
    )
}
export default Step1