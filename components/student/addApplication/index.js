import React, { useEffect, useState } from 'react'
import CollegeAdminHero from '../../collgeadmin/collegeAdminHero'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const AddApplication = ({ cookie }) => {

    const [process, setprocess] = useState("Request")
    const [lectures, setlectures] = useState([])
    const router = useRouter()


    const initialValue = {
        leaveStartDate: "",
        leaveEndDate: "",
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
                    setlectures(data)
                }

            } catch (error) {
                if (error.response?.data.msg) {
                    toast.error(error.response.data.msg)
                }
            }
        }
        getData()
    }, [])



    const [values, setvalues] = useState(initialValue)

    const handleChange = (e) => {
        setvalues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setprocess("Requesting ...")
            console.log(values)
            const { data } = await axios.post(`http://localhost:8000/api/leave-request/add/`, values, {
                withCredentials: true,
                headers: {
                    "X-CSRFTOKEN": cookie.csrftoken
                }
            })
            if (data) {
                toast.success(data.msg)
                setprocess("Request")
                router.push("/student")
                setvalues(initialValue)
            }

        } catch (error) {
            setprocess("Request")
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
                <div>
                    <div className='h-full bg-white rounded-sm w-full px-8 py-6'>

                        <form className='w-full mt-6' onSubmit={handleSubmit}>
                            <div className='mb-4 flex justify-start items-center'>
                                <p className='text-[#023E8A] text-xl w-32 font-medium mr-5'>From : </p>
                                <input
                                    value={values.leaveStartDate}
                                    onChange={handleChange}
                                    type="date"
                                    name='leaveStartDate'
                                    required
                                    placeholder=''
                                    className='rounded text-gray-700 h-9 focus:ring-[#CAF0F8] border-[#CAF0F8] w-full max-w-[340px] bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide' />
                            </div>
                            <div className='mb-4 flex justify-start items-center'>
                                <p className='text-[#023E8A] text-xl w-32 font-medium mr-5'>To : </p>
                                <input
                                    value={values.leaveEndDate}
                                    onChange={handleChange}
                                    type="date"
                                    name='leaveEndDate'
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
                                <button type='submit' disabled={process === "Request" ? false : true} className='bg-[#2091F9] rounded-lg hover: py-[4px] tracking-wider font-medium capitalize text-white text-[20px] px-3 text-clrprimary10 transition-all ease-linear duration-300 w-52 disabled:cursor-not-allowed'>
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

export default AddApplication