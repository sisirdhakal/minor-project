import React, { useEffect, useState } from 'react'
import NoticeHero from './noticeHero'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import CenteredLoading from '../../common/Loader'
import dayjs from 'dayjs'
import CollegeAdminHero from '../../components/collgeadmin/collegeAdminHero'

function NoticeDetails({ cookie, id }) {

    const [noticeDetail, setnoticeDetail] = useState(null)
    const [loading, setloading] = useState(true)

    var LocalizedFormat = require('dayjs/plugin/localizedFormat')
    dayjs.extend(LocalizedFormat)

    useEffect(() => {
        const getData = async () => {
            setloading(true)
            try {
                const { data } = await axios.get(`http://localhost:8000/api/get-notice-detail/${id}/`, {
                    withCredentials: true,
                    headers: {
                        "X-CSRFTOKEN": cookie.csrftoken
                    }
                })
                if (data) {
                    console.log(data)
                    setloading(false)
                    setnoticeDetail(data)
                }

            } catch (error) {
                setloading(false)
                if (error.response?.data.msg) {
                    toast.error(error.response.data.msg)
                }
            }

        }
        getData()
    }, [])

    return (
        <>

            {
                loading ? <div className='py-6 bg-white rounded overflow-y-scroll scrollbar-hide px-8'>
                    <p className='text-secondary-text text-center text-lg font-medium'>Loading Notice Detail ...</p>
                    <CenteredLoading />
                </div> :
                    <div className='h-full pb-10'>
                        <div>
                            <CollegeAdminHero title={noticeDetail?.title ?? ''} image={"/assets/images/notice.svg"} />
                        </div>
                        <div className='bg-white rounded overflow-y-scroll scrollbar-hide py-2 px-8'>
                            <div>
                                <div className='mb-4'>
                                    <span className='border-b-2 font-bold text-primary-text py-[2px] px-1 border-secondary-text'>{dayjs(noticeDetail?.postedDateTime).format("LL")}</span>
                                </div>
                                <div>
                                    <p className='font-semibold text-clrgrey2'>{
                                        noticeDetail?.content
                                    }</p>

                                </div>
                                <div className=" mx-auto pointer-events-auto py-5">
                                    {

                                        noticeDetail?.file && <iframe
                                            src={noticeDetail?.file}
                                            className="h-[90vh] w-full rounded pointer-events-auto"
                                        ></iframe>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
            }

        </>
    )
}


export default NoticeDetails