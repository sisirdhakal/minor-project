import React, { useState, useEffect, useRef } from 'react'
import CollegeAdminHero from '../../collegeAdminHero'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../redux';
import { BsCameraFill } from 'react-icons/bs'

const AddProgramComp = ({ cookie }) => {
    const dispatch = useDispatch()
    const {data:departments, success} = useSelector(state => state.collegeadmin.allDepartments)
    const {setAllDepartments, setSuccessFalse} = bindActionCreators(actionCreators, dispatch)

    const [process, setprocess] = useState("Add Program")
    const router = useRouter()

    const filePicker = useRef(null)
    const [selectedFile, setselectedFile] = useState(null)
    const [fileName, setfileName] = useState(null)


    const initialValue = {
        name: "",
        department: "",
    }
    const addFile = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            setfileName(e.target.files[0].name)
            reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = (event) => {
            setselectedFile(event.target.result)
        }

    }


    const [values, setvalues] = useState(initialValue)

    const handleChange = (e) => {
        setvalues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setprocess("Adding ...")
            let details = {
                name: values.name,
                department: values.department,
                syllabus: selectedFile
            }
            const { data } = await axios.post(`http://localhost:8000/api/admin/program/add/`, details, {
                withCredentials: true,
                headers: {
                    "X-CSRFTOKEN": cookie.csrftoken
                }
            })
            if (data) {
                toast.success(data.msg)
                setprocess("Add Program")
                setSuccessFalse("collegeadmin_allPrograms")
                router.push("/collegeadmin/program")
                setvalues(initialValue)
            }

        } catch (error) {
            setprocess("Add Program")
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
                    setAllDepartments(data)
                }
            } catch (error) {
                if (error.response?.data.msg) {
                    toast.error(error.response.data.msg)
                }
            }
        }
        if(!success){
            getDepartments()
        }        
    }, [])


    return (
        <div>
            <div>
                <CollegeAdminHero parent={"program"} title={"Add Program"} image={"/assets/images/program.svg"} />
            </div>
            <div className='my-10'>
                <div className='h-full bg-white rounded-sm w-full px-8 py-6'>
                    <form action="" className='w-1/2' onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label className='text-sm'>Program Name<span className='text-red-800'>*</span></label>
                            <input value={values.name} onChange={handleChange} type='text' name='name' placeholder='eg. Bachelor of XXXXXXXX' className='w-full bg-[#caf0f8] border-none outline-none h-8' required></input>
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
                        <label className='text-sm'>Syllabus</label>
                        <div className='flex space-x-8 w-[560px] mb-3 items-center'>
                            <p htmlFor="noticeType" className='text-sm bg-background py-1 px-3 rounded-md textce font-medium capitalize'>Choose File :</p>
                            <div className="flex items-center h-full">
                                <div className=" mx-auto flex items-center justify-center cursor-pointer rounded-full bg-[#0096C7] h-10 w-10"
                                    onClick={() => { filePicker.current.click() }}>
                                    <BsCameraFill className='text-white text-xl' />
                                </div>
                                <input ref={filePicker} onChange={addFile} name='syllabus' type="file" hidden />
                                <p className='ml-5 bg-clrgrey9 rounded px-4 py-2 min-w-[120px]'>
                                    {fileName ?? null}
                                </p>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <button disabled={process === "Add Program" ? false : true} className='bg-[#2091F9] rounded-lg hover: py-[4px] font-medium capitalize text-white text-[16px] px-3 text-clrprimary10 transition-all ease-linear duration-300 w-36 disabled:cursor-not-allowed'>
                                {process}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProgramComp
