import React, { useEffect, useState } from 'react'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../redux';
import axios from 'axios';
import moment from 'moment';
import toast from 'react-hot-toast';
const date_regex =/^\d{4}\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])$/;


function Step1() {

    const dispatch = useDispatch()
    const { setVerifyDetailsValue } = bindActionCreators(actionCreators, dispatch)

    const { signUpDetails: { step1, placeholder1 } } = useSelector(state => state.auth)
    const { verifyDetails, verifyDetails: { dobStudent } } = useSelector(state => state.signup)

    const handleChange = (e) => {
        setVerifyDetailsValue(e)
    }

    useEffect(() => {
        // console.log(verifyDetails)
    }, [verifyDetails])

    const verifyData = async (e) => {
        e.preventDefault()
        try {
            let result = date_regex.test(dobStudent)
            if (!result) {
                toast.error("Wrong date format !!")
                return;
            }

            // const { data } = await axios.post("http://localhost:8000/api/parent-verify/", verifyDetails, { withCredentials: true })
            // if (data) {
                console.log("data")
                // console.log(payload)
                // () => { setSignUpSteps(step + 1) }
            // }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <div className='items-center flex mt-2 mb-4'>
                <BsFillCheckCircleFill className='text-[#0096C7]' />
                <p className='items-center text-[#0096C7] mx-1 font-semibold'>
                    {step1}
                </p>
            </div>
            <form onSubmit={verifyData} className='grid grid-cols-1 gap-y-2'>

                <div className='bg-background px-4 space-x-1 py-[2px] rounded-2xl flex justify-center items-center'>
                    <input
                        placeholder={`${placeholder1}`}
                        value={verifyDetails.text}
                        onChange={handleChange}
                        className='rounded-3xl text-gray-700 h-10 focus:ring-[#CAF0F8] border-[#CAF0F8] w-full bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide'
                        type="text"
                        name="text"
                        required />
                </div>

                <div className=''>
                    <select
                        className='bg-background px-7 space-x-1 py-[0px] rounded-2xl flex justify-center items-center h-[42px] border-0 w-full cursor-pointer text-[#676B6B] font-medium focus:ring-0' placeholder='ID Type' name='idType'
                        value={verifyDetails.idType}
                        onChange={handleChange}
                        required
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
                        name="idNumber"
                        required />
                </div>
                <div className='bg-background pl-4 space-x-1 py-[2px] rounded-2xl flex justify-center items-center font-medium'>
                    <input
                        placeholder={`Date of Birth : yyyy/mm/dd`}
                        value={verifyDetails.dobStudent}
                        onChange={handleChange}
                        className='rounded-3xl h-10 focus:ring-[#CAF0F8] border-[#CAF0F8] w-full bg-background focus:border-[#CAF0F8] text-[#676B6B] placeholder:font-medium placeholder:tracking-wide'
                        type={"text"}
                        required
                        name="dobStudent" />
                </div>
                <button className='w-full p-1 bg-primary-text rounded-2xl  transition-all duration-500 mt-2 ease-in-out text-white text-xl font-medium ' type='submit' >Proceed</button>
            </form>
        </>
    )
}
export default Step1