import Image from 'next/image';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { BiShow, BiHide } from 'react-icons/bi';
import { FiMail } from 'react-icons/fi'
import { MdVpnKey } from 'react-icons/md'

import toast, { Toaster } from 'react-hot-toast';

/**
 * for importing the actioncreators
 */
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import axios from 'axios';


function SigninComp() {

  const dispatch = useDispatch()
  const { setSignUpToggle, clearSignup } = bindActionCreators(actionCreators, dispatch)

  const initialValue = {
    email: "",
    password: ""
  }


  const [values, setvalues] = useState(initialValue)
  const [showpass, setshowpass] = useState(false);

  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value })
  }

  const [user, setuser] = useState("parent")

  const router = useRouter()

  const loginUser = async (e) => {

    e.preventDefault()

    toast.success('Logged in Successfull!')
    // router.push(`/${user}`)

  }

  useEffect(() => {
    clearSignup()
  }, [])

  useEffect(() => {
    const user = async () => {
      try {

        const { data } = await axios.get("http://127.0.0.1:8000/api/get-csrf/", {
          withCredentials: true
        })

        if (data) {
          console.log(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    user()

    // eslint-disable-next-line
  }, [])


  // const [password, setPassword] = useState('');
  // const [email, setemail] = useState('');

  // const passwordBlur = (e) => {
  //   if (!e.target.value) {
  //     setPassword('');
  //   }
  // };
  // const emailBlur = (e) => {
  //   if (!e.target.value) {
  //     setemail('');
  //   }
  // };



  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={6}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 1000,
          style: {
            background: '#363636',
            color: '#fff',
          },

          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
      <div className='flex justify-center items-center h-screen'>

        <div className='lg:grid grid-cols-2 gap-8 w-full hover:shadow-xl shadow-black transition-all ease-linear duration-300 lg:w-[800px] px-2 lg:px-6 rounded py-5 mx-auto bg-white'>
          <div className=' gap-1 px-2 py-12 hidden lg:block items-center '>

            <div className='relative w-[280px] mx-auto h-[128px]  rounded-sm'>
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
            <div className='relative w-full mx-auto h-[248px]  rounded-sm'>
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
            <div className='relative lg:w-full mx-auto h-[220px]  rounded-sm'>
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

            <form onSubmit={loginUser} action="" className='grid grid-cols-1 gap-y-4 -mt-5'>
              {/* Email */}
              <div className='bg-background px-4 space-x-1 py-[2px] rounded-2xl flex justify-center items-center'>
                <div className='relative flex justify-center items-center'>

                  <FiMail className='h-6 w-6 text-gray-900 cursor-pointer hover:text-gray-400 transition-all ease-in-out duration-300' />
                  {/* <p
                    className={`text-gray-600 absolute font-medium pointer-events-none font-sans ${values.email !== ''
                      ? ' bg-white ml-16 text-sm -translate-y-6'
                      : ' -mt-4 ml-24 translate-y-2'
                      } transition-all ease-in-out duration-300`}
                  >
                    Email
                  </p> */}
                </div>
                <input
                  placeholder='Email'
                  value={values.email}
                  onChange={handleChange}
                  className='rounded-3xl text-gray-700 h-12 focus:ring-[#CAF0F8] border-[#CAF0F8] w-full bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium'
                  type="email"
                  name="email"
                  required
                />
              </div>
              {/* password */}
              <div className='relative bg-background space-x-1 px-4 py-[2px] rounded-2xl flex justify-center items-center '>

                <MdVpnKey className='h-6 w-6 text-gray-900 cursor-pointer hover:text-gray-400 transition-all ease-in-out duration-300' />

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
                  onChange={handleChange} className='rounded-3xl text-gray-700 h-12 focus:ring-[#CAF0F8] border-[#CAF0F8] w-full bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium'
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
                <button className=' text-secondary-text/80 font-semibold'  > Forget Password ?</button>
              </div>

              <button className='w-full p-1 bg-button rounded-2xl  transition-all duration-500 ease-in-out text-white text-xl font-medium ' onClick={loginUser} >Login</button>

            </form>
            <div className='flex justify-center items-center'>

              <p className=' my-2 text-secondary-text text-center font-semibold'>Don't have an account ?
              </p>
              <button className=' text-[#023E8A] ml-2 font-bold' onClick={() => { setSignUpToggle(true) }}  > SignUp</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SigninComp