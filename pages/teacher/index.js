import React, { useEffect, useState } from 'react'
import { DashboardLayout } from '../../components/layout/dashboard';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Image from 'next/image';

export default function Teacher({ cookie }) {

    const [routine, setroutine] = useState(null)

    useEffect(() => {
        const getData = async () => {
            // setloading(true)
            try {
                const { data } = await axios.get(`http://localhost:8000/api/admin/routine/`, {
                    withCredentials: true,
                    headers: {
                        "X-CSRFTOKEN": cookie.csrftoken
                    }
                })
                if (data) {
                    // setloading(false)
                    setroutine(data)

                    // setadvices(data)
                }

            } catch (error) {
                console.log(error)
                // setloading(false)
                if (error.response?.data.msg) {

                    toast.error(error.response.data.msg)
                }
            }
        }
        getData()
    }, [])


    return (
        <div className='bg-white'>
            <div>
                <h1 className='text-xl text-clrgrey1 font-semibold text-center py-5'>Class Schedule</h1>
            </div>
            {routine?.routineImage && <div className='relative w-full mx-auto h-[600px]  rounded-sm'>
                <Image
                    alt=''
                    priority
                    src={routine.routineImage}
                    className='rounded-sm object-fit'
                    fill
                    unoptimized
                    quality={"100"}
                    sizes="(min-width: 60em) 24vw,
                            (min-width: 28em) 45vw,
                            100vw"
                />
            </div>}
        </div>
    )
}

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}

Teacher.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
