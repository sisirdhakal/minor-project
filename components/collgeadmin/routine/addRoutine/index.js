import React, { useState, useEffect, useRef } from 'react'
import CollegeAdminHero from '../../collegeAdminHero'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../redux';
import { BsCameraFill } from 'react-icons/bs'

const AddRoutineComp = ({ cookie }) => {

    const [process, setprocess] = useState("Add Routine")
    const { data: classes, success:successClass } = useSelector(state => state.collegeadmin.allClasses)
    const { data: teachers, success:successTeacher } = useSelector(state => state.collegeadmin.allTeachers)
    const router = useRouter()
    const dispatch = useDispatch()
    const { setAllClasses, setAllTeachers } = bindActionCreators(actionCreators, dispatch)

    const filePicker = useRef(null)
    const [selectedFile, setselectedFile] = useState(null)
    const [fileName, setfileName] = useState(null)

    const initialFilteredOptions = {
        type: '',
        data: []
    }
    const [filteredOptions, setfilteredOptions] = useState(initialFilteredOptions)

    const initialValue = {
        routineType: '',
        routineFor: null,
        information: ''
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
    useEffect(() => {
        if (values.routineType !== '') {
            if(values.routineType === 'ClassRoutine'){
                setfilteredOptions({
                    type: 'class',
                    data: classes
                })
                return;
            } else {
                setfilteredOptions({
                    type: 'teacher',
                    data: teachers
                })
            }
        }
    }, [values.routineType])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setprocess("Adding ...")
            let details = {
                routineType: values.routineType,
                routineFor: values.routineFor,
                information: values.information,
                routineImage: selectedFile
            }
            const { data } = await axios.post(`http://localhost:8000/api/admin/routine/add/`, details, {
                withCredentials: true,
                headers: {
                    "X-CSRFTOKEN": cookie.csrftoken
                }
            })
            if (data) {
                toast.success(data.msg)
                setprocess("Add Routine")
                router.push(`/collegeadmin/routine/`)
                setvalues(initialValue)
            }

        } catch (error) {
            setprocess("Add Routine")
            if (error.response?.data.msg) {
                toast.error(error.response.data.msg)
            }
        }

    }
    useEffect(() => {
        const getClasses = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/admin/class/`, {
                    withCredentials: true,
                    headers: {
                        "X-CSRFTOKEN": cookie.csrftoken
                    }
                })
                if (data) {
                    setAllClasses(data)
                }
            } catch (error) {
                if (error.response?.data.msg) {
                    toast.error(error.response.data.msg)
                }
            }
        }
        const getTeachers = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/admin/teacher/`, {
                    withCredentials: true,
                    headers: {
                        "X-CSRFTOKEN": cookie.csrftoken
                    }
                })
                if (data) {
                    setAllTeachers(data)
                }
            } catch (error) {
                if (error.response?.data.msg) {
                    toast.error(error.response.data.msg)
                }
            }
        }
        if (!successClass) {
            getClasses()
        }
        if (!successTeacher) {
            getTeachers()
        }
    }, [])

    return (
        <div>
            <div>
                <CollegeAdminHero parent={"routine"} title={"Add Routine"} image={"/assets/images/routine.svg"} />
            </div>
            <div className='my-10'>
                <div className='h-full bg-white rounded-sm w-full px-8 py-6'>
                    <form action="" className='w-1/2' onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label className='text-sm'>Routine Type <span className='text-red-800'>*</span></label>
                            <select value={values.routineType} onChange={handleChange} type='text' name='routineType' className='w-full text-sm bg-[#caf0f8] border-none outline-none h-8 p-[-3px]' required>
                                <option value='' selected>Select type</option>
                                <option value='ClassRoutine'>Class Routine</option>
                                <option value='TeacherRoutine'>Teacher Routine</option>
                            </select>
                        </div>
                        <div className='mb-3'>
                            <label className='text-sm'>Routine For<span className='text-red-800'>*</span></label>
                            <select value={values.routineFor} onChange={handleChange} type='text' name='routineFor' className='w-full text-sm bg-[#caf0f8] border-none outline-none h-8 p-[-3px]' required>
                                <option value='' selected>Select {values.routineType === 'TeacherRoutine' ? `teacher` : `class`}</option>
                                {
                                    filteredOptions?.data.map(item => {
                                        if(filteredOptions.type === 'class'){
                                            const { id, name } = item
                                            return <option key={id} value={id} className='cursor-pointer capitalize'>{name}</option>
                                        } else {
                                            const { id, user_profile } = item
                                            return <option key={id} value={id} className='cursor-pointer capitalize'>{user_profile.firstName} {user_profile.middleName} {user_profile.lastName}</option>
                                        }
                                    })
                                }
                            </select>
                        </div>
                        <div className='mb-3'>
                            <label className='text-sm'>Information</label>
                            <textarea value={values.information} onChange={handleChange} type='text' name='information' placeholder='Effective from' className='w-full bg-[#caf0f8] border-none outline-none h-20' rows='10'></textarea>
                        </div>
                        <label className='text-sm'>Routine Image</label>
                        <div className='flex space-x-8 w-[560px] mb-3 items-center'>
                            <p htmlFor="routineImage" className='text-sm bg-background py-1 px-3 rounded-md textce font-medium capitalize'>Choose Image :</p>
                            <div className="flex items-center h-full">
                                <div className=" mx-auto flex items-center justify-center cursor-pointer rounded-full bg-[#0096C7] h-10 w-10"
                                    onClick={() => { filePicker.current.click() }}>
                                    <BsCameraFill className='text-white text-xl' />
                                </div>
                                <input ref={filePicker} onChange={addFile} name='routineImage' type="file" hidden />
                                <p className='ml-5 bg-clrgrey9 rounded px-4 py-2 w-[250px] overflow-hidden'>
                                    {fileName ?? null}
                                </p>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <button disabled={process === "Add Routine" ? false : true} className='bg-[#2091F9] rounded-lg hover: py-[4px] font-medium capitalize text-white text-[16px] px-3 text-clrprimary10 transition-all ease-linear duration-300 w-36 disabled:cursor-not-allowed'>
                                {process}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddRoutineComp
