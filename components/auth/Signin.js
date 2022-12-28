import Image from 'next/image';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { BiShow, BiHide } from 'react-icons/bi';
import { FiMail } from 'react-icons/fi'
import { MdVpnKey } from 'react-icons/md'

function Signin() {

  const initialValue = {
    email: "",
    password: ""
  }

  const [values, setvalues] = useState(initialValue)
  const [showpass, setshowpass] = useState(false);

  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value })
  }

  const loginUser = async () => {

  }

  return (
    <>
      <div className='flex justify-center items-center h-full'>
        <div className='grid grid-cols-2 gap-8 w-full hover:shadow-xl shadow-black transition-all ease-linear duration-300 lg:w-[800px] px-2 lg:px-6 rounded py-5 mx-auto bg-white'>
          <div className=' gap-1 px-2 py-10'>
            
            <div className='relative w-[240px] mx-auto h-[120px]  rounded-sm'>
              <Image
                alt=''
                priority
                src={"/assets/images/wrcms.svg"}
                className='rounded-md object-cover'
                fill
                sizes="(min-width: 60em) 24vw,
                            (min-width: 28em) 45vw,
                            100vw"
              />
            </div>
            <div className='relative w-full mx-auto h-[240px]  rounded-sm'>
              <Image
                alt=''
                priority
                src={"/assets/images/wrc.png"}
                className='rounded-sm object-cover'
                fill
                sizes="(min-width: 60em) 24vw,
                            (min-width: 28em) 45vw,
                            100vw"
              />
            </div>
          </div>

          <div className=''>
            <div className='relative w-full mx-auto h-[220px]  rounded-sm'>
              <Image
                alt=''
                priority
                src={"/assets/images/logo.svg"}
                className='rounded-md'
                fill
                sizes="(min-width: 60em) 24vw,
                            (min-width: 28em) 45vw,
                            100vw"
              />
            </div>

            <form onSubmit={e => e.preventDefault()} action="" className='grid grid-cols-1 gap-y-4 -mt-5'>
              {/* Email */}
              <div className='bg-background px-4 space-x-1 py-[2px] rounded-2xl flex justify-center items-center '>

                <FiMail className='h-6 w-6 text-gray-800 cursor-pointer hover:text-gray-400 transition-all ease-in-out duration-300' />
                <input
                  placeholder='Email'
                  value={values.email}
                  onChange={handleChange}
                  className='rounded-3xl text-gray-700 h-12 focus:ring-[#CAF0F8] border-[#CAF0F8] w-full bg-background focus:border-[#CAF0F8]'
                  type="email"
                  name="email" />
              </div>
              {/* password */}
              <div className='relative bg-background space-x-1 px-4 py-[2px] rounded-2xl flex justify-center items-center '>

                <MdVpnKey className='h-6 w-6 text-gray-800 cursor-pointer hover:text-gray-400 transition-all ease-in-out duration-300' />

                <div
                  onClick={() => setshowpass(!showpass)}
                  className=" flex absolute right-2 inset-y-0 items-center cursor-pointer pr-3 text-gray-600 transition-all duration-200 "
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
                  onChange={handleChange} className='rounded-3xl text-gray-700 h-12 focus:ring-[#CAF0F8] border-[#CAF0F8] w-full bg-background focus:border-[#CAF0F8]'
                  type={showpass ? 'text' : 'password'}
                  name="password" />
              </div>

              {/* submit Button */}
              <div className='flex justify-between'>
                <div className="flex items-center">
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input type="checkbox" className="sr-only" />
                      <div className="block transition-all ease-in-out duration-500 bg-[#CCCCCC] w-16 h-9 rounded-full"></div>
                      <div className="dot absolute left-1 top-1 bg-white w-7 h-7 rounded-full transition-all ease-in-out duration-500"></div>
                    </div>
                    <div className="text-[#676B6B] font-medium mx-1 text-sm">
                      Remember Password
                    </div>
                  </label>
                </div>
                <button className=' text-secondary-text/60 font-medium'  > Forget Password ?</button>
              </div>

              <button className='w-full p-1 h-11 mt-4 rounded-3xl  transition-all duration-500 ease-in-out text-xl font-light ' onClick={loginUser} >Login</button>

            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signin