import React from 'react'

function AddNotice() {
    return (
        <>
            <div className='h-full bg-white rounded-sm w-full px-8 py-8'>
                <div className='grid grid-cols-2 w-96 mb-3'>
                    <label htmlFor="noticeType" className='text-lg font-medium capitalize'>Notice Type</label>
                    <select
                        className='bg-[#2091F9] px-7 space-x-1 py-[0px] rounded flex justify-center items-center h-[36px] border-0 w-40 cursor-pointer text-clrgrey1 font-medium focus:ring-0' placeholder='Notice Type' name='noticeType'
                        required
                    >
                        <option className='bg-background' value="Notice Type" disabled defaultValue>Notice Type</option>
                        {/* <option value='Class' className='cursor-pointer capitalize'>Class</option>
                        <option value='College' className='cursor-pointer'>College</option> */}

                    </select>
                </div>
                <div className='grid grid-cols-2 w-96'>
                    <label htmlFor="noticeFor" className='text-lg font-medium capitalize'>Notice For</label>
                    <div>
                    <select
                        className='bg-[#2091F9] px-7 space-x-1 py-[0px] rounded flex justify-center items-center h-[36px] border-0 w-40 cursor-pointer text-black font-medium focus:ring-0' placeholder='Notice Type' name='noticeType'
                        required
                        style={{
                            backgroundImage:"none"
                        }}
                        id='select'
                    >
                        <option value="" className='bg-background' defaultValue disabled >Notice For</option>
                        {/* <option value='Citizenship' className='cursor-pointer capitalize'>Citizenship</option>
                        <option value='Passport' className='cursor-pointer'>Passport</option> */}

                    </select>
                </div>
                </div>
            </div>
        </>
    )
}

export default AddNotice

// import React, { useState } from 'react'
// import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

// function AddNotice() {

//     const [noticeFor, setNoticeFor] = useState("Notice For")
//     const [noticeType, setNoticeType] = useState("Notice Type")

//     const handleClick = () => {
        
//     }

//     return (
//         <>
//             <div className='h-full bg-white rounded-sm w-full px-8 py-8'>
//                 <div className='grid grid-cols-2 w-96 mb-3'>
//                     <div className='grid grid-cols-2 w-72 items-center'>
//                         <label htmlFor="noticeType" className='text-lg font-medium capitalize'>Notice Type :</label>
//                         <div className="group w-40 relative justify-center items-center cursor-pointer">
//                             <button className="w-full bg-[#2091F9] font-semibold h-9 border border-clrgrey9 text-white grid grid-cols-auto  relative items-center rounded px-2">
//                                 <span className='text-lg text-center'>{noticeType}</span>
//                                 <span><MdOutlineKeyboardArrowDown className='text-white h-8 w-8' /></span>
//                             </button>
//                             <ul className="hidden absolute z-50 top-[100%] transition-all duration-300 ease-in-out group-hover:block opacity-0 group-hover:opacity-100 bg-background text-gray-700 ">

//                                 <button className="px-5 capitalize  text-clrgrey3 font-medium py-2 disabled:cursor-not-allowed" disabled>
//                                     Notice Type
//                                 </button>
//                                 <button className="px-5 hover:text-clrgrey2 capitalize  text-clrgrey5 font-medium py-2" onClick={() => { setNoticeType("Class") }}>
//                                     Class
//                                 </button>
//                                 <button className="px-5 hover:text-clrgrey2 capitalize  text-clrgrey5 font-medium py-2" onClick={() => { setNoticeType("College") }}>
//                                     College
//                                 </button>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//                 <div className='grid grid-cols-2 w-72 items-center'>
//                     <label htmlFor="noticeFor" className='text-lg font-medium capitalize'>Notice For :</label>
//                     <div className="group w-40 relative justify-center items-center cursor-pointer">
//                         <button className="w-full bg-[#2091F9] font-semibold h-9 border border-clrgrey9 text-white grid grid-cols-auto  relative items-center rounded px-2">
//                             <span className='text-lg text-center'>{noticeFor}</span>
//                             <span><MdOutlineKeyboardArrowDown className='text-white h-8 w-8' /></span>
//                         </button>
//                         <ul className="hidden absolute w-full z-50 top-[100%] transition-all duration-300 ease-in-out group-hover:block opacity-0 group-hover:opacity-100 bg-background text-gray-700">
//                             <button className="px-5 hover:text-clrgrey2 capitalize  text-clrgrey5 font-medium py-2" onClick={() => { setNoticeFor("BCT076") }}>
//                                 BCT076
//                             </button>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default AddNotice