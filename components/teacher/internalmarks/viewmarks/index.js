import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import CenteredLoading from '../../../../common/Loader'

function ViewMarks({ values }) {

    const { subjects, marks } = values

    return (
        <>
            <div className='grid grid-cols-1 gap-y-2 mt-6 relative bg-white px-4 py-2 w-full h-full rounded-sm'>
                {
                    subjects?.map(item => {
                        const { id, name, rollNumber, } = item
                        return <div key={id} className=''>
                            <div>
                                <h1 className='text-primary-text text-[18px] font-semibold capitalize'>{name}</h1>
                            </div>
                            <div className='grid grid-cols-9 gap-1 py-1'>

                            </div>
                        </div>
                    })
                }
            </div>
        </>
    )
}

export default ViewMarks