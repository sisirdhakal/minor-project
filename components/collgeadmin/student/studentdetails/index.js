import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import CollegeAdminHero from '../../collegeAdminHero'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../../../redux'

const StudentDetails = ({ cookie, id }) => {

    const { userDetails } = useSelector(state => state.collegeadmin)
    const dispatch = useDispatch()
    const { setUserDetails } = bindActionCreators(actionCreators, dispatch)

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/admin/student/${id}`, {
                    withCredentials: true,
                    headers: {
                        "X-CSRFTOKEN": cookie.csrftoken
                    }
                })
                if (data) {
                    setUserDetails(data)
                }

            } catch (error) {
                if (error.response?.data.msg) {
                    toast.error(error.response.data.msg)
                }
            }

        }
        getData()
    }, [])


    return (
        <div>
            <CollegeAdminHero parent={"student"} title={"Details"} image={"/assets/images/student.svg"} />

            <div className='mt-10'>
                <div className='h-full bg-white rounded-sm w-full px-8 py-6'>

                </div>
            </div>

        </div>
    )
}

export default StudentDetails