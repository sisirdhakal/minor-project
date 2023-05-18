import React, { useEffect } from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard'
import CollegeAdminHero from '../../../components/collgeadmin/collegeAdminHero'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../../redux'
import Link from 'next/link'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const Lecture = ({cookie}) => {
    const dispatch = useDispatch()
    const {data:classes, success:classSuccess} = useSelector(state=> state.collegeadmin.allClasses)
    const {data:teachers, success:teacherSuccess} = useSelector(state=> state.collegeadmin.allTeachers)
    const {setAllClasses, setAllTeachers} = bindActionCreators(actionCreators, dispatch)

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
        if(!classSuccess){
            getClasses()
        } 
        if(!teacherSuccess){
            getTeachers()
        }        
    }, [])
    
    return (
        <div>
            <CollegeAdminHero title={"Lecture"} image={"/assets/images/lecture.svg"} button={"Add"} url={"/collegeadmin/lecture/add"} />
            <p className='text-lg font-medium'>Select a class to view lectures</p>
            <div className='grid grid-cols-7 gap-5 mt-3 mb-5'>
                {
                    classes?.map(item => {
                        const {name, id} = item;
                        return <div>
                            <Link href={`/collegeadmin/lecture/class_${id}`}><div className='bg-white p-2 rounded-md text-center hover:bg-[#2091f9] hover:text-white'>{name}</div></Link>
                        </div>
                    })
                }
            </div>
            <p className='text-lg font-medium'>Select a teacher to view lectures</p>
            <div className='grid grid-cols-3 gap-5 mt-3 mb-5'>
                {
                    teachers?.map(item => {
                        const {user_profile, id} = item;
                        return <div>
                            <Link href={`/collegeadmin/lecture/teacher_${id}`}><div className='bg-white p-2 rounded-md text-center hover:bg-[#2091f9] hover:text-white'>{user_profile.firstName} {user_profile.middleName} {user_profile.lastName}</div></Link>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Lecture

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}

Lecture.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};