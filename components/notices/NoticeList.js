import React from 'react'
import { useState } from 'react'
import { MdMessage } from 'react-icons/md'
import { collegeNotice, noticeOptions } from '../../utils/mockdata'

function NoticeList() {
    const [active, setactive] = useState("college")
    return (
        <div className='h-[460px] relative bg-white w-full rounded-sm'>
            <div className='grid grid-cols-3'>

                {
                    noticeOptions.map(({ id, name }) => {
                        return <button key={id} className={`font-bold transition-all ease-in-out duration-300  text-lg py-2 font-sans ${active.toLocaleLowerCase() === name.toLocaleLowerCase() ? ("border-b-[3px] text-primary-text border-secondary-text") : ("text-[#0096C7] border-b-[3px] border-white")}`} onClick={() => { setactive(name) }}>
                            {name}
                        </button>
                    })
                }

            </div>
            <div className='py-4 '>
                {
                    collegeNotice.map(item => {
                        const { id, notice } = item
                        return <div key={id} className=" px-5 py-3 ">
                            <div className='flex items-center'>

                                <MdMessage className='text-secondary-text mr-2 w-[40px] h-[40px]' />
                                <p className='font-bold flex-1 text-primary-text'>{notice}</p>
                            </div>
                        </div>
                    })
                }


            </div>
        </div>
    )
}

export default NoticeList