import React, { useState } from 'react'
import { MdVpnKey } from 'react-icons/md'
import { BiShow, BiHide } from 'react-icons/bi';
import { BsFillCheckCircleFill } from 'react-icons/bs'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux';
import { useRouter } from 'next/router';

function Step3({ csrf }) {

    const router = useRouter()
    const [process, setprocess] = useState("Signup")

    const initialValue = {
        email: "",
        password: "",
        confirmPassword: ""
    }
    const dispatch = useDispatch()
    const { setSignupData } = bindActionCreators(actionCreators, dispatch)

    const [values, setvalues] = useState(initialValue)
    const [showpass, setshowpass] = useState(false);
    const [showconfirmpass, setshowconfirmpass] = useState(false);

    const handleChange = (e) => {
        setvalues({ ...values, [e.target.name]: e.target.value })
    }

    const { id, signupData } = useSelector(state => state.signup)
    const { signUpDetails: { type: userType }, user } = useSelector(state => state.auth)

    const signupUser = async (e) => {
        e.preventDefault()
        setprocess("Signing up...")
        try {
            if (values.password !== values.confirmPassword) {
                return toast.error("Passwords doesnot match !!")
            }
            let signupValues = {}
            if (user === "two") {
                signupValues = { ...signupData }
            }
            signupValues.role = localStorage.getItem("signupRole")
            signupValues.userRole = userType
            signupValues.password = values.password
            signupValues.id = id
            console.log(signupValues)
            const { data } = await axios.post("http://localhost:8000/api/signup/", signupValues, {
                withCredentials: true, headers: {
                    "X-CSRFTOKEN": csrf
                }
            })
            if (data) {
                toast.success(data.msg)
                setprocess("Signup")
                setTimeout(() => {
                    router.push("/")
                }, 1000);
            }
        } catch (error) {
            setprocess("Signup")
            if (error.response?.data.msg) {
                toast.error(error.response.data.msg)
            }
        }

    }


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
            <form onSubmit={signupUser} action="" className='grid grid-cols-1 gap-y-2'>

                <div className='bg-background px-4 space-x-1 py-[2px] rounded-2xl flex justify-center items-center'>
                    <input
                        placeholder={`Email`}
                        value={signupData.email}
                        onChange={(e) => { setSignupData(e) }}
                        className='rounded-3xl text-gray-700 h-10 focus:ring-[#CAF0F8] border-[#CAF0F8] w-full bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide'
                        type="email"
                        name="email"
                        disabled={user === "one" ? true : false}
                    />
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
                        value={values.password}
                        onChange={handleChange}
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
                        value={values.confirmPassword}
                        onChange={handleChange}
                        className='rounded-3xl text-gray-700 h-10 focus:ring-[#CAF0F8] border-[#CAF0F8] w-full bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide'
                        type={showconfirmpass ? 'text' : 'password'}
                        name="confirmPassword"
                        required />
                </div>

                <button type='submit' disabled={process === "Signup" ? false : true} className='w-full p-1 bg-primary-text rounded-2xl  transition-all duration-500 mt-2 ease-in-out text-white text-xl font-medium '>{process}</button>

            </form>
        </>
    )
}

export default Step3