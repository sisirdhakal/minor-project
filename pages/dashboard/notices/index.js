import React, { useState } from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard';
import { noticeOptions } from '../../../utils/mockdata';

function Notices() {

    const [active, setactive] = useState("college")

    return (
        <>
            <div className=' h-full'>
                <div className='bg-white w-full h-10 px-2 flex justify-between rounded-full py-1 lg:px-8 mb-8'>
                    <p className='font-semibold mt-[2px]'>Notices</p>
                </div>

                <div className='bg-white h-full rounded'>
                    <div className='grid grid-cols-3'>

                        {
                            noticeOptions.map(({ id, name, textStyle }) => {
                                return <button key={id} className={`font-bold transition-all ease-in-out duration-300 ${textStyle} pl-8 pr-10  text-lg py-2 font-sans ${active.toLocaleLowerCase() === name.toLocaleLowerCase() ? ("border-b-[3px] text-primary-text border-secondary-text") : ("text-[#0096C7] border-b-[3px] border-white")}`} onClick={() => { setactive(name) }}>
                                    {name}
                                </button>
                            })
                        }

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