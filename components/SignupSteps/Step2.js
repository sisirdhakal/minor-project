import React from 'react'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../redux'

function Step2() {

    const dispatch = useDispatch()
    const { setSignupData, setSignUpSteps } = bindActionCreators(actionCreators, dispatch)

    const { step } = useSelector(state => state.auth)
    const { signupData } = useSelector(state => state.signup)

    const handleChange = (e) => {
        setSignupData(e)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSignUpSteps(step + 1)
    }

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
            <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-y-2'>

                <div className=''>
                    <select
                        className='bg-background px-7 space-x-1 py-[0px] rounded-2xl flex justify-center items-center h-[42px] border-0 w-full cursor-pointer text-[#676B6B] font-medium focus:ring-0' placeholder='Courtesy Title' name='courtesyTitle'
                        value={signupData.courtesyTitle}
                        onChange={handleChange}
                        required
                    >
                        {/* <option value="" disabled  hidden>Courtesy Title</option> */}
                        <option value="" disabled defaultValue>Courtesy Title</option>
                        <option value='Mr.' className='cursor-pointer capitalize'>Mr</option>
                        <option value='Mrs.' className='cursor-pointer'>Mrs</option>
                        <option value='Ms.' className='cursor-pointer'>Ms</option>

                    </select>
                </div>

                <div className='bg-background px-4 space-x-1 py-[2px] rounded-2xl flex justify-center items-center'>
                    <input
                        placeholder={`Your Name`}
                        value={signupData.parentName}
                        onChange={handleChange}
                        className='rounded-3xl text-gray-700 h-10 focus:ring-[#CAF0F8] border-[#CAF0F8] w-full bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide'
                        type="text"
                        name="parentName"
                        required />
                </div>

                <div className='bg-background px-4 space-x-1 py-[2px] rounded-2xl flex justify-center items-center'>
                    <input
                        placeholder={`Contact Number`}
                        value={signupData.contactNumber}
                        onChange={handleChange}
                        className='rounded-3xl text-gray-700 h-10 focus:ring-[#CAF0F8] border-[#CAF0F8] w-full bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide'
                        type="number"
                        name="contactNumber"
                        required />
                </div>

                <div className='bg-background px-4 space-x-1 py-[2px] rounded-2xl flex justify-center items-center'>
                    <input
                        placeholder={`Address`}
                        value={signupData.address}
                        onChange={handleChange}
                        className='rounded-3xl text-gray-700 h-10 focus:ring-[#CAF0F8] border-[#CAF0F8] w-full bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide'
                        type="text"
                        name="address"
                        required />
                </div>
                <button className='w-full p-1 bg-primary-text rounded-2xl  transition-all duration-500 mt-2 ease-in-out text-white text-xl font-medium ' type='submit' >Proceed</button>
            </form>
        </>
    )
}

export default Step2