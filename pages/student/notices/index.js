import React, { useState } from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard';
import { collegeNotice, noticeOptions } from '../../../utils/mockdata';
import { MdMessage } from 'react-icons/md'
import Link from 'next/link';
import NoticeHero from '../../../components/notices/noticeHero';

function Notices() {

    const [active, setactive] = useState("college")

    return (
        <>
            <div className=' h-full'>
                <NoticeHero />

                <div className='bg-white h-full rounded'>
                    <div className='grid grid-cols-3'>

                        {
                            noticeOptions.map(({ id, name, textStyle }) => {
                                return <button key={id} className={`font-bold transition-all ease-in-out duration-300 ${textStyle ? (textStyle) : ("text-start")}  pl-8 pr-10  text-lg py-2 font-sans ${active.toLocaleLowerCase() === name.toLocaleLowerCase() ? ("border-b-[3px] text-primary-text border-secondary-text") : ("text-[#0096C7] border-b-[3px] border-white")}`} onClick={() => { setactive(name) }}>
                                    {name}
                                </button>
                            })
                        }

                    </div>
                    <div>
                        <div className='py-4 grid grid-rows-1'>
                            {
                                collegeNotice.map(item => {
                                    const { id, notice } = item
                                    return <Link key={id} href={`/dashboard/notices/${id}`} >
                                        <button className=" px-5 py-3 ">
                                            <div className='flex items-center'>
                                                <MdMessage className='text-secondary-text mr-2 w-[40px] h-[40px]' />
                                                <p className='font-bold flex-1 text-primary-text'>{notice}</p>
                                            </div>
                                        </button>
                                    </Link>
                                })
                            }


                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

Notices.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default Notices

