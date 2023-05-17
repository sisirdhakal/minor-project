import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../redux'
import Link from 'next/link'


function CollegeAdmin({ cookie }) {
    const dispatch = useDispatch()
    const { setAllBatches } = bindActionCreators(actionCreators, dispatch)


    // useEffect(() => {
    //     const getData = async () => {
    //         try {
    //             const { data } = await axios.get(`http://localhost:8000/api/admin/batch/`, {
    //                 withCredentials: true,
    //                 headers: {
    //                     "X-CSRFTOKEN": cookie.csrftoken
    //                 }
    //             })
    //             if (data) {
    //                 setAllBatches(data)
    //             }

    //         } catch (error) {
    //             if (error.response?.data.msg) {
    //                 toast.error(error.response.data.msg)
    //             }
    //         }

    //     }
    //     getData()
    // }, [])


    return (
        <>
            <div className='w-full flex-1 pb-6'>

                <div className='grid lg:grid-cols-3 gap-6 mb-8'>




                </div>
            </div>
        </>
    )
}

export default CollegeAdmin