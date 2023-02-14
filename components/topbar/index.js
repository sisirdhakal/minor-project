import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { AiFillCaretDown } from 'react-icons/ai'
import { BsPerson, BsPersonFill } from 'react-icons/bs'
import { useSelector } from 'react-redux';

export default function Topbar() {

    const [visible, setvisible] = useState(false)
    const router = useRouter()

    const { userName } = useSelector(state => state.dashboard)

    const logout = async () => {

        try {

            const { data: { msg } } = await axios.get("http://localhost:8000/api/logout/", { withCredentials: true })

            if (msg) {
                toast.success(msg)
                setTimeout(() => {
                    router.push("/")
                }, 1000);
            }
        } catch (error) {
            console.log(error)
            if (error.response?.data.msg) {
                toast.error(error.response.data.msg)
            }
        }
    }

    return (
        <>
            <div className='h-20 sticky bg-[#CAF0F8] top-0 z-20  items-center flex justify-center'>

                <div className='bg-white w-full h-10 px-2 flex justify-between rounded-full py-1 lg:px-8 mb-2'>
                    <p className='text-primary-text text-[14px] lg:text-[16px] mt-1 font-bold lg:mt-[2px]'>PASCHIMANCHAL Campus, Pokhara</p>
                    <div className='w-auto space-x-4 relative bg-clrgrey10 hover:bg-clrprimary8 transition-all duration-500 ease-in-out p-3 h-full items-center flex justify-center rounded-xl cursor-pointer' onClick={() => {
                        visible ? (setvisible(false)) : (setvisible(true))
                    }}>
                        <span className='rounded-full flex items-center justify-center p-[2px] border-2 border-secondary-text'>
                            <BsPerson className='text-secondary-text text-xl' />
                        </span>
                        <p className="font-bold text-secondary-text flex-1 text-center">{userName}</p>
                        <AiFillCaretDown className='text-secondary-text' />

                        {visible && <div className='absolute flex items-center justify-center rounded-xl mt-[78px] z-20 bg-teal-400 w-full right-0 h-8 hover:bg-teal-700 transition-all duration-500 ease-in-out'>
                            <button className='text-white ' onClick={logout}>Logout</button>
                        </div>}
                    </div>
                </div>
            </div>
        </>
    )
}
