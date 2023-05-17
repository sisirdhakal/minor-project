import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import CollegeAdminHero from '../../collegeAdminHero'
import DateComp from '../../../../common/DatePicker'
import axios from 'axios'
import { internalMutate } from 'swr/_internal'
import { toast } from 'react-hot-toast'

const AddStudentComp = ({ cookie }) => {

    const [process, setprocess] = useState("Add Student")
    const [departments, setdepartments] = useState([])
    const [batches, setbatches] = useState([])
    const [classes, setclasses] = useState([])
    const [filteredClasses, setfilteredClasses] = useState([])

    const initialValue = {
        courtesyTitle: "",
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        address: "",
        contact: "",
        fathersName: "",
        mothersName: "",
        dateOfBirth: "",
        nationality: "",
        idType: "",
        idNumber: "",
        batch: null,
        department: null,
        cLass: null,
        rollNumber: ""
    }
    const [values, setvalues] = useState(initialValue)

    useEffect(() => {
      if(values.batch && values.department){
        let test = classes.filter(item => item.batch === Number(values.batch) && item.department === Number(values.department))
        setfilteredClasses(test)
      } else {
        setfilteredClasses([])
      }
    }, [values.batch, values.department])
    
    
    const handleChange = (e) => {
        console.log(e.target.value)
        setvalues({ ...values, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (values.dateOfBirth === "") {
            return toast.error("Date of birth is required.")
        }
        try {
            setprocess("Adding ...")
            const { data } = await axios.post(`http://localhost:8000/api/admin/student/add/`, values, {
                withCredentials: true,
                headers: {
                    "X-CSRFTOKEN": cookie.csrftoken
                }
            })
            if (data) {
                toast.success(data.msg)
                setprocess("Add Student")
                router.push("/collegeadmin/student/")
                setvalues(initialValue)
            }

        } catch (error) {
            setprocess("Add Student")
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
        const getClasses = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/admin/class/`, {
                    withCredentials: true,
                    headers: {
                        "X-CSRFTOKEN": cookie.csrftoken
                    }
                })
                if (data) {
                    setclasses(data)
                }
            } catch (error) {
                if (error.response?.data.msg) {
                    toast.error(error.response.data.msg)
                }
            }
        }
        getDepartments()
        getBatches()
        getClasses()
    }, [])

    return (
        <div>
            <CollegeAdminHero parent={"student"} title={"Add Student"} image={"/assets/images/student.svg"} />

            <div className='my-10'>
                <div className='h-full bg-white rounded-sm w-full px-8 py-6'>
                    <form action="" className='w-full' onSubmit={handleSubmit}>
                        <div className='grid grid-cols-7 gap-5'>
                            <div className='col-span-1'>
                                <label className='text-sm'>Title <span className='text-red-800'>*</span></label>
                                <select value={values.courtesyTitle} onChange={handleChange} type='text' name='courtesyTitle' className='w-full text-sm bg-[#caf0f8] border-none outline-none h-8 p-[-3px]' required>
                                    <option value='' selected></option>
                                    <option value='Ms.'>Ms.</option>
                                    <option value='Mr.'>Mr.</option>
                                    <option value='Mrs.'>Mrs.</option>
                                </select>
                            </div>
                            <div className='col-span-2'>
                                <label className='text-sm'>First Name <span className='text-red-800'>*</span></label>
                                <input value={values.firstName} onChange={handleChange} type='text' name='firstName' className='w-full bg-[#caf0f8] border-none outline-none h-8' required></input>
                            </div>
                            <div className='col-span-2'>
                                <label className='text-sm'>Middle Name</label>
                                <input value={values.middleName} onChange={handleChange} type='text' name='middleName' className='w-full bg-[#caf0f8] border-none outline-none h-8'></input>
                            </div>
                            <div className='col-span-2'>
                                <label className='text-sm'>Last Name <span className='text-red-800'>*</span></label>
                                <input value={values.lastName} onChange={handleChange} type='text' name='lastName' className='w-full bg-[#caf0f8] border-none outline-none h-8' required></input>
                            </div>
                        </div>
                        <div className='grid grid-cols-7 gap-5 mt-5'>
                            <div className='col-span-3'>
                                <label className='text-sm'>Email <span className='text-red-800'>*</span></label>
                                <input value={values.email} onChange={handleChange} type='email' name='email' className='w-full bg-[#caf0f8] border-none outline-none h-8' required></input>
                            </div>
                            <div className='col-span-2'>
                                <label className='text-sm'>Address <span className='text-red-800'>*</span></label>
                                <input value={values.address} onChange={handleChange} type='text' name='address' className='w-full bg-[#caf0f8] border-none outline-none h-8' required></input>
                            </div>
                            <div className='col-span-2'>
                                <label className='text-sm'>Contact <span className='text-red-800'>*</span></label>
                                <input value={values.contact} onChange={handleChange} type='text' name='contact' className='w-full bg-[#caf0f8] border-none outline-none h-8' required></input>
                            </div>
                        </div>
                        <div className='grid grid-cols-8 gap-5 mt-5'>
                            <div className='col-span-3'>
                                <label className='text-sm'>Father's Name <span className='text-red-800'>*</span></label>
                                <input value={values.fathersName} onChange={handleChange} type='text' name='fathersName' className='w-full bg-[#caf0f8] border-none outline-none h-8' required></input>
                            </div>
                            <div className='col-span-3'>
                                <label className='text-sm'>Mother's Name <span className='text-red-800'>*</span></label>
                                <input value={values.mothersName} onChange={handleChange} type='text' name='mothersName' className='w-full bg-[#caf0f8] border-none outline-none h-8' required></input>
                            </div>
                            <div className='col-span-2'>
                                <label className='text-sm'>Date Of Birth <span className='text-red-800'>*</span></label>
                                {/* <DateComp/> */}
                                <input value={values.dateOfBirth} onChange={handleChange} type='date' name='dateOfBirth' className='w-full bg-[#caf0f8] border-none outline-none h-8' required></input>
                            </div>
                        </div>
                        <div className='grid grid-cols-8 gap-5 mt-5'>
                            <div className='col-span-2'>
                                <label className='text-sm'>Nationality <span className='text-red-800'>*</span></label>
                                <input value={values.nationality} onChange={handleChange} type='text' name='nationality' className='w-full bg-[#caf0f8] border-none outline-none h-8' required></input>
                            </div>
                            <div className='col-span-3'>
                                <label className='text-sm'>ID Type <span className='text-red-800'>*</span></label>
                                <select value={values.idType} onChange={handleChange} type='text' name='idType' className='w-full text-sm bg-[#caf0f8] border-none outline-none h-8 p-[-3px]' required>
                                    <option value='Citizenship'>Citizenship</option>
                                    <option value='Passport'>Passport</option>
                                </select>
                            </div>
                            <div className='col-span-3'>
                                <label className='text-sm'>ID Number <span className='text-red-800'>*</span></label>
                                <input value={values.idNumber} onChange={handleChange} type='text' name='idNumber' className='w-full bg-[#caf0f8] border-none outline-none h-8' required></input>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-5 mt-5'>
                            <div className='col-span-1'>
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
                            <div className='col-span-1'>
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
                        </div>
                        <div className='grid grid-cols-2 gap-5 mt-5'>
                            <div className='col-span-1'>
                                <label className='text-sm'>Class <span className='text-red-800'>*</span></label>
                                <select value={values.cLass} onChange={handleChange} type='text' name='cLass' className='w-full text-sm bg-[#caf0f8] border-none outline-none h-8 p-[-3px]' required>
                                    <option value='' selected>Select class</option>
                                    {
                                        filteredClasses?.map(item => {
                                            const { name, id } = item;
                                            return <option value={id}>{name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-span-1'>
                                <label className='text-sm'>Roll Number <span className='text-red-800'>*</span></label>
                                <input value={values.rollNumber} onChange={handleChange} type='text' name='rollNumber' className='w-full bg-[#caf0f8] border-none outline-none h-8' required></input>
                            </div>
                        </div>
                        <div className='mt-5'>
                            <button disabled={process === "Add Student" ? false : true} className='bg-[#2091F9] rounded-lg hover: py-[4px] font-medium capitalize text-white text-[16px] px-3 text-clrprimary10 transition-all ease-linear duration-300 w-36 disabled:cursor-not-allowed'>
                                {process}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default AddStudentComp
