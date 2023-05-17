import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import CollegeAdminHero from '../../collegeAdminHero'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const EditDepartment = ({ cookie, id }) => {

    const [process, setprocess] = useState("Edit Department")
    const [teachers, setTeachers] = useState([])
    const router = useRouter()
    const initialValue = {
        name: "",
        description: "",
        mail: '',
        contact: "",
        hod: "",
        dhod: "",
    }


    const [values, setvalues] = useState(initialValue)

    const handleChange = (e) => {
        setvalues({ ...values, [e.target.name]: e.target.value })
    }


    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/admin/department/${id}/`, {
                    withCredentials: true,
                    headers: {
                        "X-CSRFTOKEN": cookie.csrftoken
                    }
                })
                if (data) {
                    console.log(data)
                    const newObject = {
                        "name": data.name ?? '',
                        "description": data.description ?? '',
                        "contact": data.contact ?? '',
                        "mail": data.mail ?? '',
                        "hod": data.headOfDepartment ?? '',
                        "dhod": data.deputyHeadOfDepartment ?? ''
                    }
                    setvalues(newObject)

                }

            } catch (error) {
                if (error) {
                    console.log(error)
                }
            }

        }
        getData()
    }, [])
    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/admin/teacher/`, {
                    withCredentials: true,
                    headers: {
                        "X-CSRFTOKEN": cookie.csrftoken
                    }
                })
                if (data) {
                    const filteredTeachers = data.filter(item => Number(item.department) === Number(id))
                    setTeachers(filteredTeachers)
                }

            } catch (error) {
                if (error) {
                    console.log(error)
                }
            }

        }
        getData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setprocess("Editing ...")
            const { data } = await axios.put(`http://localhost:8000/api/admin/department/${id}/edit/`, values, {
                withCredentials: true,
                headers: {
                    "X-CSRFTOKEN": cookie.csrftoken
                }
            })
            if (data) {
                toast.success(data.msg)
                setprocess("Edit Department")
                router.push("/collegeadmin/department")
            }

        } catch (error) {
            setprocess("Edit Department")
            if (error.response?.data.msg) {
                toast.error(error.response.data.msg)
            }
        }
    }



    return (
        <div>
            <div>
                <CollegeAdminHero parent={"department"} title={"Edit Department"} image={"/assets/images/exam.svg"} />
            </div>
            <div>
                <div className='h-full mb-6 bg-white rounded-sm w-full px-8 py-6'>

                    <div>
                        <h1 className='text-[#023E8A] mb-10 text-2xl font-medium'>
                            Edit Department
                        </h1>
                    </div>

                    <form action="" className='w-full mt-6' onSubmit={handleSubmit}>
                        <div className='mb-4 flex justify-start items-center'>
                            <p className='text-[#023E8A] text-xl w-32 font-medium mr-5'>Name</p>
                            <input
                                value={values.name}
                                onChange={handleChange}
                                type="text"
                                name='name'
                                required
                                placeholder='name'
                                className='rounded text-gray-700 h-9 focus:ring-[#CAF0F8] border-[#CAF0F8] w-full max-w-[460px] bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide' />
                        </div>
                        <div className='mb-4 flex justify-start'>
                            <p className='text-[#023E8A] text-xl w-32 font-medium mr-5'>Description</p>
                            <textarea
                                value={values.description}
                                onChange={handleChange}
                                type="text"
                                name='description'
                                placeholder='Description of department'
                                className='rounded text-gray-700 h-16 focus:ring-[#CAF0F8] border-[#CAF0F8] max-w-[460px] w-full bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide' />
                        </div>
                        <div className='mb-4 flex justify-start items-center'>
                            <p className='text-[#023E8A] text-xl w-32 font-medium mr-5'>Email</p>
                            <input
                                value={values.mail}
                                onChange={handleChange}
                                type="email"
                                name='mail'
                                placeholder='email'
                                className='rounded text-gray-700 h-9 focus:ring-[#CAF0F8] border-[#CAF0F8] w-full max-w-[460px] bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide' />
                        </div>
                        <div className='mb-4 flex justify-start items-center'>
                            <p className='text-[#023E8A] text-xl w-32 font-medium mr-5'>Phone</p>
                            <input
                                value={values.contact}
                                onChange={handleChange}
                                type="number"
                                name='contact'
                                placeholder='phone'
                                className='rounded text-gray-700 h-9 focus:ring-[#CAF0F8] border-[#CAF0F8] w-full max-w-[460px] bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide' />
                        </div>
                        <div className='mb-4 flex justify-start items-center'>
                            <p className='text-[#023E8A] text-xl w-32 font-medium mr-5'>HOD</p>
                            <select
                                className='bg-background w-full max-w-[460px] py-[0px] flex justify-center items-center h-[36px] border-0 rounded cursor-pointer text-[#676B6B] font-medium focus:ring-0'
                                placeholder='hod'
                                name='hod'
                                value={values.hod}
                                onChange={handleChange}
                            >
                                <option value="" disabled defaultValue>Teacher's Name</option>
                                {
                                    teachers?.map(item => {
                                        const { user_profile } = item
                                        if (values.dhod == item.id) return;
                                        return <option key={item.id} value={item.id} className='cursor-pointer capitalize'>{user_profile.firstName} {user_profile.middleName} {user_profile.lastName}</option>
                                    })
                                }


                            </select>

                        </div>
                        <div className='mb-4 flex justify-start items-center'>
                            <p className='text-[#023E8A] text-xl w-32 font-medium mr-5'>DHOD</p>
                            <select
                                className='bg-background w-full max-w-[460px] py-[0px] flex justify-center items-center h-[36px] border-0 rounded cursor-pointer text-[#676B6B] font-medium focus:ring-0'
                                placeholder='hod'
                                name='dhod'
                                value={values.dhod}
                                onChange={handleChange}
                            >
                                <option value="" disabled defaultValue>Teacher's Name</option>
                                {
                                    teachers?.map(item => {
                                        const { user_profile } = item
                                        if (values.hod == item.id) {
                                            return;
                                        }
                                        return <option key={item.id} value={item.id} className='cursor-pointer capitalize'>{user_profile.firstName} {user_profile.middleName} {user_profile.lastName}</option>
                                    })
                                }


                            </select>
                        </div>


                        <div className='mt-12 mb-3 flex items-center justify-center'>
                            <button disabled={process === "Edit Department" ? false : true} className='bg-[#2091F9] rounded-lg hover: py-[4px] tracking-wider font-medium capitalize text-white text-[20px] px-3 text-clrprimary10 transition-all ease-linear duration-300 w-56 disabled:cursor-not-allowed'>
                                {process}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default EditDepartment