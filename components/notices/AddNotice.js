import React, { useState } from 'react'
import DropButtons from '../../common/DropButtons'

function AddNotice() {

    const [noticeType, setnoticeType] = useState('')
    const [noticeFor, setnoticeFor] = useState('')

    return (
        <>
            <div className='h-full bg-white rounded-sm w-full px-8 py-8'>
                <div className='grid grid-cols-2 w-96 mb-3'>
                    <label htmlFor="noticeType" className='text-lg font-medium capitalize'>Notice Type</label>
                    <div className="relative text-left">
                        <DropButtons type={"Notice Type"} options={['college', 'class']} />
                    </div>

                </div>
                <div className='grid grid-cols-2 w-96'>
                    <label htmlFor="noticeFor" className='text-lg font-medium capitalize'>Notice For</label>
                    <div className="relative text-left">
                        <DropButtons type={"Notice For"} options={['BCT076']} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddNotice

