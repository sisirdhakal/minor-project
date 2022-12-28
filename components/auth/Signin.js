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
      <div className=''>
        <div>

        </div>

        <div className='w-full hover:shadow-xl shadow-black transition-all ease-linear duration-300 lg:w-[500px] px-2 lg:px-8 rounded-md bg-[#e9e2de] py-5 mx-auto'>
          <form onSubmit={e => e.preventDefault()} action="" className='grid grid-cols-1 gap-y-4 '>
            {/* Email */}
            <div className='bg-white px-4 space-x-1 py-[2pxa] rounded-full flex justify-center items-center '>

              <FiMail className='h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-400 transition-all ease-in-out duration-300' />
              <input
                placeholder='Email'
                value={values.email}
                onChange={handleChange}
                className='rounded-3xl text-gray-700 h-14 focus:ring-white border-white w-full focus:border-white'
                type="email"
                name="email" />
            </div>


            {/* password */}


            <div className='relative bg-white space-x-1 px-4 py-[2px] rounded-full flex justify-center items-center '>

              <MdVpnKey className='h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-400 transition-all ease-in-out duration-300' />

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
                onChange={handleChange} className='rounded-3xl focus:ring-white border-white text-gray-700  w-full h-14 focus:border-white'
                type={showpass ? 'text' : 'password'}
                name="password" />
            </div>

            {/* submit Button */}
            <div className='flex justify-between px-1'>
              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" className="sr-only" />
                    <div className="block transition-all ease-in-out duration-500 bg-[#CCCCCC] w-16 h-9 rounded-full"></div>
                    <div className="dot absolute left-1 top-1 bg-white w-7 h-7 rounded-full transition-all ease-in-out duration-500"></div>
                  </div>
                  <div className="ml-3 text-clrgrey5">
                    Remember Password
                  </div>
                </label>
              </div>
              <button className=' text-[#429291] ml-2 '  > Forget Password ?</button>
            </div>

            <button className='w-full p-1 h-11 mt-4 rounded-3xl text-clrprimary10  transition-all duration-500 bg-clrprimary5 hover:text-clrgrey2 hover:bg-clrprimary7 ease-in-out text-xl font-light ' onClick={loginUser} >Login</button>

          </form>
        </div>
      </div>
    </>
  )
}

export default Signin