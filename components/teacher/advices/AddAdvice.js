import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import CollegeAdminHero from '../../collgeadmin/collegeAdminHero';

const AddAdviceComp = ({ cookie }) => {

    const [process, setprocess] = useState("Add Advice")
    const router = useRouter()
    const [lectures, setlectures] = useState([])
    const [students, setStudents] = useState([])

    const initialValue = {
        student: "",
        advice: "",
        lecture: "",

    }
    const [values, setvalues] = useState(initialValue)

    const handleChange = (e) => {

        setvalues({ ...values, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (values.lecture) {
            const getData = async () => {
                try {
                    const { data } = await axios.get(` http://localhost:8000/api/add-attendance/${Number(values.lecture)}/`, {
                        withCredentials: true,
                        headers: {
                            "X-CSRFTOKEN": cookie.csrftoken
                        }
                    })
                    if (data) {
                        setStudents(data.students)
                    }

                } catch (error) {
                    if (error.response?.data.msg) {
                        toast.error(error.response.data.msg)
                    }
                }
            }
            getData()
        }

    }, [values.lecture])


    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(` http://localhost:8000/api/get-lectures/`, {
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




    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setprocess("Adding ...")
            const { data } = await axios.post(`http://localhost:8000/api/add-advice/`, values, {
                withCredentials: true,
                headers: {
                    "X-CSRFTOKEN": cookie.csrftoken
                }
            })
            if (data) {
                toast.success(data.msg)
                setprocess("Add Advice")
                router.push("/teacher/giveadvice")
                setvalues(initialValue)
            }

        } catch (error) {
            setprocess("Add Advice")
            console.log(error)
            if (error.response?.data.msg) {
                toast.error(error.response.data.msg)
            }
        }

    }
    console.log(lectures)

    return (
        <div>
            <div>
                <CollegeAdminHero parent={"advice"} title={"Add Advice"} image={"/assets/images/feedback.svg"} />
            </div>
            <div>
                <div className='h-full bg-white rounded-sm w-full px-8 py-6'>

                    <div>
                        <h1 className='text-[#023E8A] mb-10 text-2xl font-medium'>
                            Add Advice
                        </h1>
                    </div>

                    <form className='w-full mt-6' onSubmit={handleSubmit}>
                        <div className='mb-4 flex justify-start items-center'>
                            <p className='text-[#023E8A] text-xl w-32 font-medium mr-5'>Lecture</p>
                            <select
                                className='bg-background w-full max-w-[380px] py-[0px] flex justify-center items-center h-[36px] border-0 rounded cursor-pointer text-[#676B6B] font-medium focus:ring-0'
                                placeholder='hod'
                                name='lecture'
                                value={values.lecture}
                                onChange={handleChange}
                            >
                                <option value="" disabled defaultValue>Select Lecture</option>
                                {
                                    lectures?.map(item => {
                                        return <option key={item.id} value={item.id} className='cursor-pointer capitalize'>{item.subject_name} - {item.class_name}</option>
                                    })
                                }


                            </select>

                        </div>

                        <div className='mb-4 flex justify-start items-center'>
                            <p className='text-[#023E8A] text-xl w-32 font-medium mr-5'>Student </p>
                            <select
                                className='bg-background w-full max-w-[380px] py-[0px] flex justify-center items-center h-[36px] border-0 rounded cursor-pointer text-[#676B6B] font-medium focus:ring-0'
                                placeholder='student'
                                name='student'
                                value={values.student}
                                onChange={handleChange}
                            >
                                <option value="" disabled defaultValue>Select Student</option>
                                {
                                    students?.map(item => {
                                        return <option key={item.id} value={item.id} className='cursor-pointer capitalize'>{item.full_name} - {item.rollNumber}</option>
                                    })
                                }


                            </select>
                        </div>
                        <div className='mb-4 flex justify-start'>
                            <p className='text-[#023E8A] text-xl w-32 font-medium mr-5'>Advice </p>
                            <textarea
                                value={values.advice}
                                onChange={handleChange}
                                type="text"
                                name='advice'
                                placeholder='Advice To Student'
                                className='rounded text-gray-700 h-16 focus:ring-[#CAF0F8] border-[#CAF0F8] max-w-[380px] w-full bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide' />
                        </div>


                        <div className='mt-12 mb-3 flex items-center justify-center'>
                            <button type='submit' disabled={process === "Add Advice" ? false : true} className='bg-[#2091F9] rounded-lg hover: py-[4px] tracking-wider font-medium capitalize text-white text-[20px] px-3 text-clrprimary10 transition-all ease-linear duration-300 w-40 disabled:cursor-not-allowed'>
                                {process}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default AddAdviceComp
