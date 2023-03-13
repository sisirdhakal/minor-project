import React, { useState, useRef } from 'react'
import DropButtons from '../../common/DropButtons'
import { BsCameraFill } from 'react-icons/bs'

function AddNotice({ cookie }) {

    const [noticeType, setnoticeType] = useState('')
    const [noticeFor, setnoticeFor] = useState('')
    const [process, setprocess] = useState("Add Notice")
    const filePicker = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(noticeFor, noticeType)
        
    }

    return (
        <>
            <div className='h-full bg-white rounded-sm w-full px-8 py-6'>
                <div className='grid grid-cols-2 w-[340px] mb-3 items-center'>
                    <p htmlFor="noticeType" className='text-lg font-semibold capitalize'>Notice Type :</p>
                    <div className="flex items-center h-full">
                        <DropButtons setnoticeType={setnoticeType} type={"Notice Type"} options={['college', 'class']} />
                    </div>

                </div>
                <div className='grid grid-cols-2 w-[340px] items-center'>
                    <p htmlFor="noticeFor" className='text-lg font-semibold capitalize'>Notice For :</p>
                    <div className="relative text-left">
                        <DropButtons setnoticeFor={setnoticeFor} type={"Notice For"} options={['BCT076']} />
                    </div>
                </div>
                <form action="" className='w-full mt-6' onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <input type="text" placeholder='Title of notice' className='rounded text-gray-700 h-10 focus:ring-[#CAF0F8] border-[#CAF0F8] max-w-[360px] w-full bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide' />
                    </div>
                    <div className='mb-3'>
                        <textarea type="text" placeholder='Title of notice' className='rounded text-gray-700 h-28 focus:ring-[#CAF0F8] border-[#CAF0F8] max-w-[460px] w-full bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide' />
                    </div>
                    <div className='grid grid-cols-autofirst w-[300px] mb-3 items-center'>
                        <p htmlFor="noticeType" className='text-lg bg-background py-1 px-3 rounded-md textce font-medium capitalize'>Choose File :</p>
                        <div className="flex items-center h-full">
                            <div className=" mx-auto flex items-center justify-center cursor-pointer rounded-full bg-[#0096C7] h-10 w-10"
                                onClick={() => { filePicker.current.click() }}>
                                <BsCameraFill className='text-white text-xl' />
                            </div>
                            <input ref={filePicker} type="file" hidden />
                        </div>
                    </div>
                    <div className='mt-12 mb-3 flex items-center justify-center'>
                        <button disabled={process === "Add Notice" ? false : true} className='bg-[#2091F9] rounded-lg hover: py-[4px] tracking-wider font-medium capitalize text-white text-[20px] px-3 text-clrprimary10 transition-all ease-linear duration-300 w-40 disabled:cursor-not-allowed'>
                            {process}
                        </button>
                    </div>
                </form>

            </div>
        </>
    )
}

export default AddNotice

