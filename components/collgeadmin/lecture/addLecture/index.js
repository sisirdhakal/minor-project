import React, { useState, useEffect } from 'react'
import CollegeAdminHero from '../../collegeAdminHero'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../redux';

const AddLectureComp = ({ cookie }) => {

    const [process, setprocess] = useState("Add Lecture")
    const { data: classes, success:successClass } = useSelector(state => state.collegeadmin.allClasses)
    const { data: teachers, success:successTeacher } = useSelector(state => state.collegeadmin.allTeachers)
    const [subjects, setsubjects] = useState([])
    const [programSubjects, setprogramSubjects] = useState([])
    const router = useRouter()
    const dispatch = useDispatch()
    const { setAllClasses, setAllTeachers } = bindActionCreators(actionCreators, dispatch)
    const [filteredSubjects, setfilteredSubjects] = useState([])


    const initialValue = {
        type: '',
        subject: null,
        cLass: null,
        teacher: null,
        teacher2: null
    }


    const [values, setvalues] = useState(initialValue)

    const filterSubjects = () => {

        const matchingClass = classes.find((c) => c.id === Number(values.cLass))
        const filteredProgramSubjects = programSubjects?.filter((ps) => Number(ps.program) == Number(matchingClass.program) && Number(ps.semester) == Number(matchingClass.semester)
        )
        let filteredArray = []
        filteredProgramSubjects?.map(item => {
            const getSubjectFromFilteredSub = subjects.find(sub => Number(item.subject) == Number(sub.id))
            if (getSubjectFromFilteredSub) {
                filteredArray.push(getSubjectFromFilteredSub)
            }
        })
        setfilteredSubjects(filteredArray ?? [])
    }

    const handleChange = (e) => {
        setvalues({ ...values, [e.target.name]: e.target.value })

    }
    useEffect(() => {
        if (values.cLass !== null) {
            filterSubjects()
        }
    }, [values.cLass])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setprocess("Adding ...")
            console.log(values)
            const { data } = await axios.post(`http://localhost:8000/api/admin/lecture/add/`, values, {
                withCredentials: true,
                headers: {
                    "X-CSRFTOKEN": cookie.csrftoken
                }
            })
            if (data) {
                toast.success(data.msg)
                setprocess("Add Lecture")
                router.push(`/collegeadmin/lecture/class_${values.cLass}`)
                setvalues(initialValue)
            }

        } catch (error) {
            setprocess("Add Lecture")
            if (error.response?.data.msg) {
                toast.error(error.response.data.msg)
            }
        }

    }
    useEffect(() => {
        const getSubjects = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/admin/subject/`, {
                    withCredentials: true,
                    headers: {
                        "X-CSRFTOKEN": cookie.csrftoken
                    }
                })
                if (data) {
                    setsubjects(data)
                }
            } catch (error) {
                if (error.response?.data.msg) {
                    toast.error(error.response.data.msg)
                }
            }
        }
        const getProgramSubjects = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/admin/programSubject/`, {
                    withCredentials: true,
                    headers: {
                        "X-CSRFTOKEN": cookie.csrftoken
                    }
                })
                if (data) {
                    setprogramSubjects(data)
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
        getSubjects()
        getProgramSubjects()
    }, [])

    return (
        <div>
            <div>
                <CollegeAdminHero parent={"lecture"} title={"Add Lecture"} image={"/assets/images/lecture.svg"} />
            </div>
            <div className='my-10'>
                <div className='h-full bg-white rounded-sm w-full px-8 py-6'>
                    <form action="" className='w-1/2' onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label className='text-sm'>Class <span className='text-red-800'>*</span></label>
                            <select value={values.cLass} onChange={handleChange} type='text' name='cLass' className='w-full text-sm bg-[#caf0f8] border-none outline-none h-8 p-[-3px]' required disabled={programSubjects ? false : true}>
                                <option value='' selected>Select class</option>
                                {
                                    classes?.map(item => {
                                        const { name, id } = item;
                                        return <option value={id}>{name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className='mb-3'>
                            <label className='text-sm'>Subject <span className='text-red-800'>*</span></label>
                            <select value={values.subject} onChange={handleChange} type='text' name='subject' className='w-full text-sm bg-[#caf0f8] border-none outline-none h-8 p-[-3px]' required>
                                <option value='' selected>Select subject</option>
                                {
                                    filteredSubjects?.map(item => {
                                        const { name, id } = item;
                                        return <option value={id}>{name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className='mb-3'>
                            <label className='text-sm'>Type <span className='text-red-800'>*</span></label>
                            <select value={values.type} onChange={handleChange} type='text' name='type' className='w-full text-sm bg-[#caf0f8] border-none outline-none h-8 p-[-3px]' required>
                                <option value='' selected>Select type</option>
                                {
                                    subjects?.map(item => {
                                        const { id, type } = item;
                                        if (id === Number(values.subject)) {
                                            if (type === "Both") {
                                                return <>
                                                    <option value="Theory">Theory</option>
                                                    <option value="Practical">Practical</option>
                                                </>
                                            }
                                            else if (type === "Theory") {
                                                return <option value="Theory">Theory</option>
                                            } else {
                                                return <option value="Practical">Practical</option>
                                            }
                                        }
                                    })
                                }
                            </select>
                        </div>
                        <div className='mb-3'>
                            <label className='text-sm'>Teacher-1 <span className='text-red-800'>*</span></label>
                            <select value={values.teacher} onChange={handleChange} type='text' name='teacher' className='w-full text-sm bg-[#caf0f8] border-none outline-none h-8 p-[-3px]' required>
                                <option value='' selected>Select teacher</option>
                                {
                                    teachers?.map(item => {
                                        const { user_profile } = item
                                        if (values.teacher2 == item.id) return;
                                        return <option key={item.id} value={item.id} className='cursor-pointer capitalize'>{user_profile.firstName} {user_profile.middleName} {user_profile.lastName}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className='mb-3'>
                            <label className='text-sm'>Teacher-2</label>
                            <select value={values.teacher2} onChange={handleChange} type='text' name='teacher2' className='w-full text-sm bg-[#caf0f8] border-none outline-none h-8 p-[-3px]'>
                                <option value='' selected>Select teacher</option>
                                {
                                    teachers?.map(item => {
                                        const { user_profile } = item
                                        if (values.teacher == item.id) return;
                                        return <option key={item.id} value={item.id} className='cursor-pointer capitalize'>{user_profile.firstName} {user_profile.middleName} {user_profile.lastName}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className='mt-3'>
                            <button disabled={process === "Add Lecture" ? false : true} className='bg-[#2091F9] rounded-lg hover: py-[4px] font-medium capitalize text-white text-[16px] px-3 text-clrprimary10 transition-all ease-linear duration-300 w-36 disabled:cursor-not-allowed'>
                                {process}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddLectureComp
