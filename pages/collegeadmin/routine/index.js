import React, { useEffect } from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard'
import CollegeAdminHero from '../../../components/collgeadmin/collegeAdminHero'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../../redux'
import Link from 'next/link'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const Routine = ({cookie}) => {
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
            <CollegeAdminHero title={"Routine"} image={"/assets/images/routine.svg"} button={"Add"} url={"/collegeadmin/routine/add"} />
            <p className='text-lg font-medium'>Select a class to view routine</p>
            <div className='grid grid-cols-7 gap-5 mt-3 mb-5'>
                {
                    classes?.map(item => {
                        const {name, id} = item;
                        return <div>
                            <Link href={`/collegeadmin/routine/class_${id}`}><div className='bg-white p-2 rounded-md text-center hover:bg-[#2091f9] hover:text-white'>{name}</div></Link>
                        </div>
                    })
                }
            </div>
            <p className='text-lg font-medium'>Select a teacher to view routine</p>
            <div className='grid grid-cols-3 gap-5 mt-3 mb-5'>
                {
                    teachers?.map(item => {
                        const {user_profile, id} = item;
                        return <div>
                            <Link href={`/collegeadmin/routine/teacher_${id}`}>
                                <div className='bg-white p-2 rounded-md text-center hover:bg-[#2091f9] hover:text-white text-lg'>
                                    <p className='font-medium'>{user_profile.firstName} {user_profile.middleName} {user_profile.lastName}</p>
                                    <p className='text-sm'>Department:</p>
                                    <p className='text-sm'>{item.department_name.split('of ')[1]}</p>                                
                                </div>
                            </Link>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Routine

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}

Routine.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};