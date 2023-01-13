import React, { useState } from 'react'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../redux';

function Step1() {

    const initialValue = {
        text: "",
        idType: "",
        idNumber: "",
        dateOfBirth: ""
    }

    const [values, setvalues] = useState(initialValue)

    const handleChange = (e) => {
        setvalues({ ...values, [e.target.name]: e.target.value })
    }

    const dispatch = useDispatch()
    const { } = bindActionCreators(actionCreators, dispatch)

    const { step, signUpDetails: { type, quote, steps, step1, placeholder1 } } = useSelector(state => state.auth)

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
                        value={values.text}
                        onChange={handleChange}
                        className='rounded-3xl text-gray-700 h-10 focus:ring-[#CAF0F8] border-[#CAF0F8] w-full bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide'
                        type="text"
                        name="text" />
                </div>

                <div className=''>
                    <select
                        className='bg-background px-7 space-x-1 py-[0px] rounded-2xl flex justify-center items-center h-[42px] border-0 w-full cursor-pointer text-[#676B6B] font-medium focus:ring-0' placeholder='ID Type' name='idType'
                        value={values.idType}
                        onChange={handleChange}
                    >
                        <option value="" disabled selected hidden>ID Type</option>
                        <option value='price-lowest' className='cursor-pointer capitalize'>Citizenship</option>
                        <option value='price-highest' className='cursor-pointer'>Passport</option>

                    </select>
                </div>
                <div className='bg-background px-4 space-x-1 py-[2px] rounded-2xl flex justify-center items-center'>
                    <input
                        placeholder={`ID Number`}
                        value={values.idNumber}
                        onChange={handleChange}
                        className='rounded-3xl text-gray-700 h-10 focus:ring-[#CAF0F8] border-[#CAF0F8] w-full bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide'
                        type="text"
                        name="idNumber" />
                </div>
                <div className='bg-background pl-4 space-x-1 py-[2px] rounded-2xl flex justify-center items-center font-medium'>
                    <input
                        placeholder={`Date of Birth`}
                        value={values.dateOfBirth}
                        onChange={handleChange}
                        className='rounded-3xl h-10 focus:ring-[#CAF0F8] border-[#CAF0F8] w-full bg-background focus:border-[#CAF0F8] text-[#676B6B] placeholder:font-medium placeholder:tracking-wide'
                        type={"text"}
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                        name="dateOfBirth" />
                </div>
            </form>
        </>
    )
}

export default Step1