import React, { useEffect, useState } from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard';
import CollegeAdminHero from "../../../components/collgeadmin/collegeAdminHero"
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function LeaveApplication({ cookie }) {


    const [process, setprocess] = useState("Request")
    const [lectures, setlectures] = useState([])
    const router = useRouter()



    const initialValue = {
        from: "",
        to: "",
        lecture: "",
        reason: ""
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(` http://localhost:8000/api/leave-request/add/`, {
                    withCredentials: true,
                    headers: {
                        "X-CSRFTOKEN": cookie.csrftoken
                    }
                })
                if (data) {
                    console.log(data)
                    setlectures(data)
                }

            } catch (error) {
                console.log(error)
                if (error.response?.data.msg) {
                    toast.error(error.response.data.msg)
                }
            }
        }
        getData()
    }, [])



    const [values, setvalues] = useState(initialValue)

    const handleChange = (e) => {
        if (e.target.name === "year" && Number(e.target.value) > 9999) {
            return;
        }
        else { setvalues({ ...values, [e.target.name]: e.target.value }) }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setprocess("Adding ...")
            const { data } = await axios.post(`http://localhost:8000/api/admin/batch/add/`, values, {
                withCredentials: true,
                headers: {
                    "X-CSRFTOKEN": cookie.csrftoken
                }
            })
            if (data) {
                toast.success(data.msg)
                setprocess("Add Batch")
                router.push("/collegeadmin/batch")
                setvalues(initialValue)
            }

        } catch (error) {
            setprocess("Add Batch")
            console.log(error)
            if (error.response?.data.msg) {
                toast.error(error.response.data.msg)
            }
        }
    }



    return (
        <>
            <div>
                <CollegeAdminHero title={"Leave Application"} image={"/assets/images/routine.svg"} />
            </div>
            <div>
                <div>
                    <div className='h-full bg-white rounded-sm w-full px-8 py-6'>

                        <form className='w-full mt-6' onSubmit={handleSubmit}>
                            <div className='mb-4 flex justify-start items-center'>
                                <p className='text-[#023E8A] text-xl w-32 font-medium mr-5'>From : </p>
                                <input
                                    value={values.year}
                                    onChange={handleChange}
                                    type="date"
                                    name='from'
                                    required
                                    placeholder=''
                                    className='rounded text-gray-700 h-9 focus:ring-[#CAF0F8] border-[#CAF0F8] w-full max-w-[340px] bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide' />
                            </div>
                            <div className='mb-4 flex justify-start items-center'>
                                <p className='text-[#023E8A] text-xl w-32 font-medium mr-5'>To : </p>
                                <input
                                    value={values.startedFrom}
                                    onChange={handleChange}
                                    type="date"
                                    name='to'
                                    required
                                    placeholder=''
                                    className='rounded text-gray-700 h-9 focus:ring-[#CAF0F8] border-[#CAF0F8] w-full max-w-[340px] bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide' />
                            </div>

                            <div className='mb-4 flex justify-start items-center'>
                                <p className='text-[#023E8A] text-xl w-32 font-medium mr-5'>Lecture</p>
                                <select
                                    className='bg-background w-full max-w-[340px] py-[0px] flex justify-center items-center h-[36px] border-0 rounded cursor-pointer text-[#676B6B] font-medium focus:ring-0'
                                    placeholder='hod'
                                    name='lecture'
                                    value={values.lecture}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled defaultValue>Select Lecture</option>
                                    {
                                        lectures?.map(item => {
                                            console.log(item)
                                            return <option key={item.id} value={item.id} className='cursor-pointer capitalize'>{item.subject_name}</option>
                                        })
                                    }


                                </select>

                            </div>

                            <div className='mb-4 flex justify-start'>
                                <p className='text-[#023E8A] text-xl w-32 font-medium mr-5'>Reason</p>
                                <textarea
                                    value={values.content}
                                    onChange={handleChange}
                                    type="text"
                                    name='reason'
                                    placeholder='Reason'
                                    className='rounded text-gray-700 h-28 focus:ring-[#CAF0F8] border-[#CAF0F8] max-w-[460px] w-full bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide' />
                            </div>


                            <div className='mt-12 mb-3 flex items-center justify-center'>
                                <button type='submit' disabled={process === "Request" ? false : true} className='bg-[#2091F9] rounded-lg hover: py-[4px] tracking-wider font-medium capitalize text-white text-[20px] px-3 text-clrprimary10 transition-all ease-linear duration-300 w-40 disabled:cursor-not-allowed'>
                                    {process}
                                </button>
                            </div>
                        </form>

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

LeaveApplication.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};