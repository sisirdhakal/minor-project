import Image from 'next/image';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { BiShow, BiHide } from 'react-icons/bi';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im'

/**
 * for importing the actioncreators
 */
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux';
import { useDispatch } from 'react-redux';

function Signup() {

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
              <div className='relative w-[80px] mb-2 h-[60px]  rounded-sm'>
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
              <p className='text-4xl pl-2 mb-2 tracking-wide font-semibold'>Sign Up as</p>
              <h1 className='uppercase text-7xl text-primary-text font-semibold pl-2 mb-2'>parent</h1>
              <div className='flex pl-3 '>
                <span>
                  <FaQuoteLeft className='text-[14px] font-medium mr-2' />
                </span>
                <p className='text-[#888888] font-sans font-medium'>
                  Behind every child who believes himself is a parent who believed first.
                  <span className='inline-block'>
                    <FaQuoteRight className='text-[14px] text-black font-medium ml-2' />
                  </span>
                </p>

              </div>
            </div>
          </div>

          <div className=''>
            <div className='relative lg:w-full mx-auto h-[220px]  rounded-sm'>

            </div>

            <form onSubmit={e => e.preventDefault()} action="" className='grid grid-cols-1 gap-y-4 -mt-5'>


            </form>
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

export default Signup