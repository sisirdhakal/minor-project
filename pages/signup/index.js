import Image from 'next/image';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'

/**
 * for importing the actioncreators
 */
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import TypeOne from '../../components/Steps/TypeOne';
import TypeTwo from '../../components/Steps/TypeTwo';
import Button1 from '../../components/buttons/Button1';
import Button2 from '../../components/buttons/Button2';
import { useRouter } from 'next/router';
import axios from 'axios';
import moment from 'moment';
import toast from 'react-hot-toast';
const date_regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;


function Signup({ csrf }) {
    axios.defaults.headers.common['X-CSRFToken'] = csrf;

    const [active, setactive] = useState("step1")
    const router = useRouter()

    const dispatch = useDispatch()
    const { setSignUpToggle, setSignUpSteps, clearSignupData } = bindActionCreators(actionCreators, dispatch)

    const { step, signUpDetails: { type, quote, steps }, user } = useSelector(state => state.auth)
    const { verifyDetails, verifyDetails: { dobStudent } } = useSelector(state => state.signup)

    useEffect(() => {
        if (!user) {
            router.push("/")
        }
    }, [user])

    const verifyData = async () => {
        try {
            let result = date_regex.test(dobStudent)
            if (!result) {
                toast.error("Wrong date format !!")
                return;
            }

            const { data } = await axios.post("http://localhost:8000/api/parent-verify/", verifyDetails, { withCredentials: true })
            if (data) {
                console.log(data)
                // console.log(payload)
                // () => { setSignUpSteps(step + 1) }
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        clearSignupData()
    }, [])



    return (
        <>
            {user && <div className='flex justify-center h-screen items-center'>
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
                                    src={`/assets/images/${type.toLowerCase()}.svg`}
                                    className='rounded-md'
                                    fill
                                    sizes="(min-width: 60em) 24vw,
                            (min-width: 28em) 45vw,
                            100vw"
                                />
                            </div>
                            <p className='text-5xl pl-2 my-2  font-semibold'>Sign Up as</p>
                            <h1 className='uppercase text-7xl text-primary-text font-bold pl-2 my-2'>{type}</h1>
                            <div className='flex pl-3 my-2 '>
                                <span>
                                    <FaQuoteLeft className='text-[14px] font-medium mr-2' />
                                </span>
                                <p className='text-[#888888] w-64 font-sans font-medium'>
                                    {quote}
                                    <span className='inline-block'>
                                        <FaQuoteRight className='text-[14px] text-black font-medium ml-2' />
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='py-6'>
                        <div className='grid grid-cols-3 pr-10 gap-x-1 items-center h-16 rounded-sm'>
                            {
                                user === "one" ? (<Button1 />) : (<Button2 />)
                            }
                        </div>

                        <div className='h-[240px] items-center'>

                            {
                                user === "one" ? (<TypeOne />) : (<TypeTwo />)

                            }
                        </div>

                        {
                            step === steps ?
                                (<button className='w-full p-1 bg-primary-text rounded-2xl  transition-all duration-500 mt-2 ease-in-out text-white text-xl font-medium '  >Signup</button>) : (
                                    <button className='w-full p-1 bg-primary-text rounded-2xl  transition-all duration-500 mt-2 ease-in-out text-white text-xl font-medium ' onClick={verifyData} >Proceed</button>
                                )
                        }


                        <div className='flex justify-center items-center'>

                            <p className=' my-2 text-secondary-text text-center font-semibold'>Already have an account ?
                            </p>
                            <Link href={"/"}>
                                <button className=' text-[#023E8A] ml-2 font-semibold'  > Signin</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Signup

export const getServerSideProps = async ({ req, res }) => {
    try {

        await axios.get(`http://localhost:8000/api/get-csrf/`, { withCredentials: true });
    } catch (error) {
        console.log(error)
    }

    const token = req?.cookies?.csrftoken || null

    // return {
    //     props: {
    //         csrf: token,
    //     },
    // };
    if (token) {
        return {
            props: {
                csrf: token,
            },
        };
    } else {
        return {
            props: {
                csrf: "null"
            },
        };
    }
};