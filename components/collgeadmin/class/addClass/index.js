import React, { useState, useEffect } from 'react'
import CollegeAdminHero from '../../collegeAdminHero'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../redux';

const AddClassComp = ({ cookie }) => {

    const [process, setprocess] = useState("Add Class")
    const [departments, setdepartments] = useState([])
    const [batches, setbatches] = useState([])
    const [programs, setprograms] = useState([])
    const router = useRouter()
    const dispatch = useDispatch()
    const {setSuccessFalse} = bindActionCreators(actionCreators, dispatch)



    const initialValue = {
        name: '',
        department: null,
        batch: null,
        program: null,
        semester: null
    }


    const [values, setvalues] = useState(initialValue)

    const handleChange = (e) => {
        setvalues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setprocess("Adding ...")
            console.log(values)
            const { data } = await axios.post(`http://localhost:8000/api/admin/class/add/`, values, {
                withCredentials: true,
                headers: {
                    "X-CSRFTOKEN": cookie.csrftoken
                }
            })
            if (data) {
                toast.success(data.msg)
                setprocess("Add Class")
                setSuccessFalse("collegeadmin_allClasses")
                router.push("/collegeadmin/class")
                setvalues(initialValue)
            }

        } catch (error) {
            setprocess("Add Class")
            console.log(error)
            if (error.response?.data.msg) {
                toast.error(error.response.data.msg)
            }
        }

    }
    useEffect(() => {
        const getDepartments = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/admin/department/`, {
                    withCredentials: true,
                    headers: {
                        "X-CSRFTOKEN": cookie.csrftoken
                    }
                })
                if (data) {
                    setdepartments(data)
                }
            } catch (error) {
                if (error.response?.data.msg) {
                    toast.error(error.response.data.msg)
                }
            }
        }
        const getBatches = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/admin/batch/`, {
                    withCredentials: true,
                    headers: {
                        "X-CSRFTOKEN": cookie.csrftoken
                    }
                })
                if (data) {
                    setbatches(data)
                }
            } catch (error) {
                if (error.response?.data.msg) {
                    toast.error(error.response.data.msg)
                }
            }
        }
        const getPrograms = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/admin/program/`, {
                    withCredentials: true,
                    headers: {
                        "X-CSRFTOKEN": cookie.csrftoken
                    }
                })
                if (data) {
                    setprograms(data)
                }
            } catch (error) {
                if (error.response?.data.msg) {
                    toast.error(error.response.data.msg)
                }
            }
        }
        getDepartments()
        getBatches()
        getPrograms()
    }, [])

    return (
        <div>
            <div>
                <CollegeAdminHero parent={"class"} title={"Add Class"} image={"/assets/images/class.svg"} />
            </div>
            <div className='my-10'>
                <div className='h-full bg-white rounded-sm w-full px-8 py-6'>
                    <form action="" className='w-1/2' onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label className='text-sm'>Class Name<span className='text-red-800'>*</span></label>
                            <input value={values.name} onChange={handleChange} type='text' name='name' placeholder='eg. BCT-076' className='w-full bg-[#caf0f8] border-none outline-none h-8' required></input>
                        </div>
                        <div className='mb-3'>
                            <label className='text-sm'>Batch <span className='text-red-800'>*</span></label>
                            <select value={values.batch} onChange={handleChange} type='text' name='batch' className='w-full text-sm bg-[#caf0f8] border-none outline-none h-8 p-[-3px]' required>
                                <option value='' selected>Select batch</option>
                                {
                                    batches?.map(item => {
                                        const { year, id } = item;
                                        return <option value={id}>{year}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className='mb-3'>
                            <label className='text-sm'>Department <span className='text-red-800'>*</span></label>
                            <select value={values.department} onChange={handleChange} type='text' name='department' className='w-full text-sm bg-[#caf0f8] border-none outline-none h-8 p-[-3px]' required>
                                <option value='' selected>Select department</option>
                                {
                                    departments?.map(item => {
                                        const { name, id } = item;
                                        return <option value={id}>{name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className='mb-3'>
                            <label className='text-sm'>Program <span className='text-red-800'>*</span></label>
                            <select value={values.program} onChange={handleChange} type='text' name='program' className='w-full text-sm bg-[#caf0f8] border-none outline-none h-8 p-[-3px]' required>
                                <option value='' selected>Select program</option>
                                {
                                    programs?.map(item => {
                                        const { name, id, department } = item;
                                        if (department === Number(values.department)){
                                            return <option value={id}>{name}</option>
                                        }
                                    })
                                }
                            </select>
                        </div>
                        <div className='mb-3'>
                            <label className='text-sm'>Semester <span className='text-red-800'>*</span></label>
                            <input value={values.semester} onChange={handleChange} type='text' name='semester' placeholder='eg. 1' className='w-full bg-[#caf0f8] border-none outline-none h-8' required></input>
                        </div>
                        <div className='mt-3'>
                            <button disabled={process === "Add Class" ? false : true} className='bg-[#2091F9] rounded-lg hover: py-[4px] font-medium capitalize text-white text-[16px] px-3 text-clrprimary10 transition-all ease-linear duration-300 w-36 disabled:cursor-not-allowed'>
                                {process}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddClassComp
