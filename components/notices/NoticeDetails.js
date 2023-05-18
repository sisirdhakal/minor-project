import React, { useEffect, useState } from 'react'
import NoticeHero from './noticeHero'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import CenteredLoading from '../../common/Loader'
function NoticeDetails({ cookie, id }) {

    const [noticeDetail, setnoticeDetail] = useState(null)
    const [loading, setloading] = useState(true)

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
            <div className='h-full pb-10'>
                <div>

                    <NoticeHero title={noticeDetail?.title} />
                </div>
                <div className='bg-white rounded overflow-y-scroll scrollbar-hide py-2 px-8'>
                    {
                        loading ? <div className='py-6'>
                            <p className='text-secondary-text text-center text-lg font-medium'>Loading Notice Detail ...</p>
                            <CenteredLoading />
                        </div> :
                            <div>
                                <div className='mb-4'>
                                    <span className='border-b-2 font-bold text-primary-text py-[2px] px-1 border-secondary-text'>10 January, 2023</span>
                                </div>
                                <div>
                                    <p className='font-semibold text-clrgrey2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus culpa dolorem, optio quae ab exercitationem provident! Eveniet quisquam eligendi temporibus, beatae doloribus, quidem accusamus ea incidunt quo illo excepturi ad molestiae molestias minus aliquid dolorum sunt sequi sit maiores ex natus explicabo consectetur sed iste. Vel vero rem magnam voluptatum vitae excepturi et eos, esse nesciunt nobis tempore, quo autem illum dolor id quae. Eum recusandae consequuntur quasi rerum tenetur amet omnis aperiam excepturi autem earum reiciendis, quod, ut adipisci error nostrum. Hic quis ducimus doloribus quae quos incidunt ex recusandae sed et praesentium error obcaecati iste, magnam est? Atque?</p>

                                </div>
                                <div className=" mx-auto pointer-events-auto py-5">
                                    <iframe
                                        src="/assets/resume.pdf"
                                        className="h-[90vh] w-full rounded pointer-events-auto"
                                    ></iframe>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </>
    )
}


export default NoticeDetails