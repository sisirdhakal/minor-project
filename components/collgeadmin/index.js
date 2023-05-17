import React, { useEffect, useState } from 'react'

import { statsOptions } from '../../utils/constants'
import Image from 'next/image'
import { books, noticeOptions } from '../../utils/mockdata'
import ViewNotice from '../notices/viewNotice'
import axios from 'axios'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../redux'
import Link from 'next/link'


function CollegeAdmin({ cookie }) {

    const { allNotices, activeNotice, activeNoticesDatas } = useSelector(state => state.notices)
    const { sidebarUser } = useSelector(state => state.dashboard)
    const dispatch = useDispatch()
    const { setAllNotices, setActiveNotice, setActiveNoticeDatas } = bindActionCreators(actionCreators, dispatch)

    const [visible, setvisible] = useState(false)
    const [notices, setnotices] = useState([])


    // console.log(allNotices)
    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/view-notice/`, {
                    withCredentials: true,
                    headers: {
                        "X-CSRFTOKEN": cookie.csrftoken
                    }
                })
                if (data) {
                    setAllNotices(data)
                }

            } catch (error) {
                console.log(error)
            }

        }
        getData()
    }, [])

    useEffect(() => {
        let noticeDatas = `${activeNotice}Notices`
        if (noticeDatas && allNotices) {
            const values = allNotices[noticeDatas];
            setActiveNoticeDatas(values ?? [])

        }
    }, [activeNotice, allNotices])



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