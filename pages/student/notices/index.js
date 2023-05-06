import React, { useEffect, useState } from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard';
import { collegeNotice, noticeOptions } from '../../../utils/mockdata';
import { MdMessage } from 'react-icons/md'
import Link from 'next/link';
import NoticeHero from '../../../components/notices/noticeHero';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../redux';
import axios from 'axios';

function Notices({ cookie }) {

    const dispatch = useDispatch()
    const { setAllNotices, setActiveNotice, setActiveNoticeDatas } = bindActionCreators(actionCreators, dispatch)

    const { allNotices, activeNotice, activeNoticesDatas } = useSelector(state => state.notices)

    useEffect(() => {
        setActiveNotice("college")
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
            <div className=' h-full'>
                <NoticeHero />

                <div className='bg-white h-full rounded'>
                    <div className='grid grid-cols-3'>

                        {
                            noticeOptions.map(({ id, name, textStyle }) => {
                                return <button key={id} className={`font-bold transition-all ease-in-out duration-300 ${textStyle ? (textStyle) : ("text-start")}  pl-8 pr-10  text-lg py-2 font-sans ${activeNotice.toLocaleLowerCase() === name.toLocaleLowerCase() ? ("border-b-[3px] text-primary-text border-secondary-text") : ("text-[#0096C7] border-b-[3px] border-white")}`} onClick={() => { setActiveNotice(name.toLowerCase()) }}>
                                    {name}
                                </button>
                            })
                        }

                    </div>
                    <div>
                        <div className='py-4 grid grid-rows-1'>
                            {
                                activeNoticesDatas?.map(item => {
                                    const { id, content, title, postedBy } = item
                                    return <Link key={id} href={`/student/notices/${id}`} >
                                        <button className=" px-5 py-3">
                                            <div className='flex items-center'>
                                                <MdMessage className='text-secondary-text mr-2 w-[40px] h-[40px]' />
                                                <p className='font-bold flex-1 text-primary-text capitalize'>{title}</p>
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

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}

Notices.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default Notices

