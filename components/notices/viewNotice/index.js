import React from 'react'
import { collegeNotice } from '../../../utils/mockdata'

import { MdMessage } from 'react-icons/md'

const ViewNotice = ({ notices }) => {
    return (
        <div>
            {
                // collegeNotice.map(item => {
                //     const { id, notice } = item
                //     return <div key={id} className=" px-5 py-3 ">
                //         <div className='flex items-center'>

                //             <MdMessage className='text-secondary-text mr-2 w-[40px] h-[40px]' />
                //             <p className='font-bold flex-1 text-primary-text'>{notice}</p>
                //         </div>
                //     </div>
                // })
            }
        </div>
    )
}

export default ViewNotice