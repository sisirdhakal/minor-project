import React, { useState } from 'react'
import CollegeAdminHero from '../../collegeAdminHero'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../redux';

const AddDepartmentComp = ({ cookie }) => {

    const [process, setprocess] = useState("Add Department")
    const router = useRouter()
    const dispatch = useDispatch()
    const {setSuccessFalse} = bindActionCreators(actionCreators, dispatch)


    const initialValue = {
        name: "",
        description: "",
        mail: '',
        contact: ""
    }


    const [values, setvalues] = useState(initialValue)

    const handleChange = (e) => {
        if (e.target.name === "contact" && e.target.value.length > 10) {
            return;
        }
        else { setvalues({ ...values, [e.target.name]: e.target.value }) }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (values.contact.length < 10 && !values.contact.startsWith("98")) {
            return;
        }

        try {
            setprocess("Adding ...")
            console.log(values)
            const { data } = await axios.post(`http://localhost:8000/api/admin/department/add/`, values, {
                withCredentials: true,
                headers: {
                    "X-CSRFTOKEN": cookie.csrftoken
                }
            })
            if (data) {
                toast.success(data.msg)
                setprocess("Add Department")
                setSuccessFalse("collegeadmin_allDepartments")
                router.push("/collegeadmin/department")
                setvalues(initialValue)
            }

        } catch (error) {
            setprocess("Add Department")
            console.log(error)
            if (error.response?.data.msg) {
                toast.error(error.response.data.msg)
            }
        }

    }


    return (
        <div>
            <div>
                <CollegeAdminHero parent={"department"} title={"Add Department"} image={"/assets/images/attendance.svg"} />
            </div>
            <div>
                <div className='h-full bg-white rounded-sm w-full px-8 py-6'>

                    <div>
                        <h1 className='text-[#023E8A] mb-10 text-2xl font-medium'>
                            Add Department
                        </h1>
                    </div>

                    <form className='w-full mt-6' onSubmit={handleSubmit}>
                        <div className='mb-4 flex justify-start items-center'>
                            <p className='text-[#023E8A] text-xl w-32 font-medium mr-5'>Name</p>
                            <input
                                value={values.name}
                                onChange={handleChange}
                                type="text"
                                name='name'
                                required
                                placeholder='name'
                                className='rounded text-gray-700 h-9 focus:ring-[#CAF0F8] border-[#CAF0F8] max-w-[180px] bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide' />
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
                                required
                                placeholder='email'
                                className='rounded text-gray-700 h-9 focus:ring-[#CAF0F8] border-[#CAF0F8] max-w-[180px] bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide' />
                        </div>
                        <div className='mb-4 flex justify-start items-center'>
                            <p className='text-[#023E8A] text-xl w-32 font-medium mr-5'>Phone</p>
                            <input
                                value={values.contact}
                                onChange={handleChange}
                                type="number"
                                name='contact'
                                required
                                placeholder='phone'
                                className='rounded text-gray-700 h-9 focus:ring-[#CAF0F8] border-[#CAF0F8] max-w-[180px] bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide' />
                        </div>


                        <div className='mt-12 mb-3 flex items-center justify-center'>
                            <button type='submit' disabled={process === "Add Department" ? false : true} className='bg-[#2091F9] rounded-lg hover: py-[4px] tracking-wider font-medium capitalize text-white text-[20px] px-3 text-clrprimary10 transition-all ease-linear duration-300 w-52 disabled:cursor-not-allowed'>
                                {process}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default AddDepartmentComp
