import React, { useEffect, useState } from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard';
import CollegeAdminHero from '../../../components/collgeadmin/collegeAdminHero';
import axios from 'axios';
import dayjs from 'dayjs';
import Link from 'next/link';
import CenteredLoading from '../../../common/Loader';
import Image from 'next/image';

const Routine = ({ cookie }) => {

    const [routine, setroutine] = useState(null)
    const [loading, setloading] = useState(false)

    useEffect(() => {
        const getData = async () => {
            setloading(true)
            try {
                const { data } = await axios.get(`http://localhost:8000/api/admin/routine/`, {
                    withCredentials: true,
                    headers: {
                        "X-CSRFTOKEN": cookie.csrftoken
                    }
                })
                if (data) {
                    setloading(false)
                    setroutine(data)

                    // setadvices(data)
                }

            } catch (error) {
                console.log(error)
                setloading(false)
                if (error.response?.data.msg) {

                    toast.error(error.response.data.msg)
                }
            }
        }
        getData()
    }, [])

    return (
        <div>
            {
                loading ? <div className='py-6 bg-white rounded-md'>
                    <p className='text-secondary-text text-center text-lg font-medium'>Loading Class Schedule ...</p>
                    <CenteredLoading />
                </div> :

                    <div className='bg-white'>
                        <div>
                            <h1 className='text-xl text-secondary-text font-semibold text-center py-5'>Class Schedule</h1>
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
            }
        </div>
    )
}

export default Routine

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}

Routine.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};