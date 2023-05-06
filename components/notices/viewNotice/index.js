import React from 'react'
import { collegeNotice } from '../../../utils/mockdata'

import { MdMessage } from 'react-icons/md'

const ViewNotice = ({ notices }) => {
    console.log(notices)
    return (
        <div>
            {
                notices?.map(item => {

                    const { id, content, title, postedBy } = item
                    return <div key={id} className=" px-5 py-3 ">
                        <div className='flex items-center'>

                            <MdMessage className='text-secondary-text mr-2 w-[40px] h-[40px]' />
                            <p className='font-bold flex-1 text-primary-text'>{title}</p>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default ViewNotice