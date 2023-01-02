import Image from 'next/image';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { BiShow, BiHide } from 'react-icons/bi';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'
import { BsFillCheckCircleFill } from 'react-icons/bs'


/**
 * for importing the actioncreators
 */
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux';
import { useDispatch } from 'react-redux';
import Step1 from './Step1';

function SignupParent() {

    const [active, setactive] = useState("step1")

    const dispatch = useDispatch()
    const { setSignUpToggle } = bindActionCreators(actionCreators, dispatch)

    return (
        <>
            <div className='flex justify-center items-center h-full'>
                <div className='lg:grid grid-cols-2 gap-8 w-full hover:shadow-xl shadow-black transition-all ease-linear duration-300 lg:w-[800px] px-2 lg:px-6 rounded py-5 mx-auto bg-white'>
                    <div className=' gap-1 px-2 py-6 hidden lg:block items-center '>

                        <div className='relative w-[260px] mb-4 mx-auto h-[60px]  rounded-sm'>
                            <Image
                                alt=''
                                priority
                                src={"/assets/images/test.svg"}
                                className='rounded-md object-cover'
                                fill
                                sizes="(min-width: 60em) 24vw,
                            (min-width: 28em) 45vw,
                            100vw"
                            />
                        </div>
                        <div className='pl-6'>
                            <div className='relative w-[80px] mb-2 h-[56px]  rounded-sm'>
                                <Image
                                    alt=''
                                    priority
                                    src={"/assets/images/parent.svg"}
                                    className='rounded-md'
                                    fill
                                    sizes="(min-width: 60em) 24vw,
                            (min-width: 28em) 45vw,
                            100vw"
                                />
                            </div>
                            <p className='text-5xl pl-2 my-2  font-semibold'>Sign Up as</p>
                            <h1 className='uppercase text-7xl text-primary-text font-semibold pl-2 my-2'>parent</h1>
                            <div className='flex pl-3 my-2 '>
                                <span>
                                    <FaQuoteLeft className='text-[14px] font-medium mr-2' />
                                </span>
                                <p className='text-[#888888] w-64 font-sans font-medium'>
                                    Behind every child who believes himself is a parent who believed first.
                                    <span className='inline-block'>
                                        <FaQuoteRight className='text-[14px] text-black font-medium ml-2' />
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='py-6'>
                        <div className='grid grid-cols-3 pr-10 gap-x-1 items-center h-16 rounded-sm'>
                            <button className={`${active === "step1" ? "active" : "test"} relative flex justify-center items-center h-10 w-full`} onClick={() => { setactive("step1") }}>
                                <p className='absolute ml-8 text-white font-medium tracking-wide'>
                                    Step-1
                                </p>
                            </button>
                            <button className={`${active === "step2" ? "active" : "test"} relative flex justify-center items-center h-10 w-full`} onClick={() => { setactive("step2") }}>
                                <p className='absolute ml-8 text-white font-medium tracking-wide'>
                                    Step-2
                                </p>
                            </button>
                            <button className={`${active === "step3" ? "active" : "test"} relative flex justify-center items-center h-10 w-full`} onClick={() => { setactive("step3") }}>
                                <p className='absolute ml-8 text-white font-medium tracking-wide'>
                                    Step-3
                                </p>
                            </button>
                        </div>

                        <div className='items-center flex mt-2 mb-4'>
                            <BsFillCheckCircleFill className='text-[#0096C7]' />
                            <p className='items-center text-[#0096C7] mx-1 font-semibold'>
                                {/* <span className='inline-block '> */}
                                {/* </span> */}
                                Verify student's details
                            </p>
                        </div>

                        {
                            <Step1 />
                        }

                        <button className='w-full p-1 bg-primary-text rounded-2xl  transition-all duration-500 mt-2 ease-in-out text-white text-xl font-medium '  >Proceed</button>
                        <div className='flex justify-center items-center'>

                            <p className=' my-2 text-secondary-text text-center font-semibold'>Already have an account ?
                            </p>
                            <button className=' text-[#023E8A] ml-2 font-semibold' onClick={() => { setSignUpToggle(true) }}  > Signin</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignupParent