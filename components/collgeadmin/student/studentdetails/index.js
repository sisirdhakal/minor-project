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

            <div className='my-10'>
                <div className='h-full bg-white rounded-sm w-full px-8 py-6'>
                    <div className='uppercase mb-5'>
                        <p className='font-semibold text-2xl'>{userDetails?.user_profile.courtesyTitle} {userDetails?.user_profile.firstName} {userDetails?.user_profile.middleName} {userDetails?.user_profile.lastName}</p>
                        <p className='font-medium text-lg text-slate-700'>{userDetails?.rollNumber}</p>
                    </div>
                    <div className='grid grid-cols-5'>
                        <div className='col-span-1'>
                            {
                                userDetails?.user_profile.photo ? 
                                    <img src={userDetails.user_profile.photo} className='w-[150px] h-[150px] object-contain rounded-full'/>
                                :
                                    <img src='/assets/images/user_placeholder.jpg' className='w-[150px] h-[150px] object-contain rounded-full'/>
                            }
                            
                        </div>
                        <div className='col-span-4'>
                            <div className='grid grid-cols-2'>
                                <div>
                                    <p className='text-clrgrey4'>Email: <span className='text-black font-medium'>{userDetails?.user_profile.email}</span></p>
                                    <p className='text-clrgrey4'>Contact: <span className='text-black font-medium'>{userDetails?.user_profile.contact}</span></p>
                                    <p className='text-clrgrey4'>Address: <span className='text-black font-medium'>{userDetails?.user_profile.address}</span></p>
                                </div>
                                <div>
                                    <p className='text-clrgrey4'>Sec. Email: <span className='text-black font-medium'>{userDetails?.user_profile.secondaryEmail}</span></p>
                                    <p className='text-clrgrey4'>Sec. Contact: <span className='text-black font-medium'>{userDetails?.user_profile.secondaryContact}</span></p>
                                    <p className='text-clrgrey4'>Sec. Address: <span className='text-black font-medium'>{userDetails?.user_profile.temporaryAddress}</span></p>
                                </div>
                            </div>
                            <div className='w-full h-1 bg-gray-300 my-5'></div>
                            <div className='grid grid-cols-2'>
                                <div>
                                    <p className='text-clrgrey4'>Nationality: <span className='text-black font-medium'>{userDetails?.user_profile.nationality}</span></p>
                                    <p className='text-clrgrey4'>ID Type: <span className='text-black font-medium'>{userDetails?.user_profile.identificationDocumentType}</span></p>
                                    <p className='text-clrgrey4'>ID Number: <span className='text-black font-medium'>{userDetails?.user_profile.identificationDocumentNumber}</span></p>
                                </div>
                                <div>
                                    <p className='text-clrgrey4'>Father's Name: <span className='text-black font-medium'>{userDetails?.user_profile.fathersName}</span></p>
                                    <p className='text-clrgrey4'>Mother's Name: <span className='text-black font-medium'>{userDetails?.user_profile.mothersName}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-1 bg-gray-300 my-5'></div>
                    <div>
                        <p className='my-3 font-medium'>College Information:</p>
                        <p className='text-clrgrey4'>Roll Number: <span className='text-black font-medium'>{userDetails?.rollNumber}</span></p>
                        <p className='text-clrgrey4'>Class: <span className='text-black font-medium'>{userDetails?.class_name}</span></p>
                        <p className='text-clrgrey4'>Program: <span className='text-black font-medium'>{userDetails?.program}</span></p>
                        <p className='text-clrgrey4'>Department: <span className='text-black font-medium'>{userDetails?.department_name}</span></p>
                        <p className='text-clrgrey4'>Batch: <span className='text-black font-medium'>{userDetails?.batch_name}</span></p>
                    </div>
                    <div className='flex mt-3'>
                        <button className='bg-[#2091F9] rounded-lg hover: py-[2px] tracking-wider font-medium capitalize text-white text-[16px] px-2 text-clrprimary10 transition-all ease-linear duration-300 w-[100px] disabled:cursor-not-allowed block mr-3'>
                            Edit
                        </button>
                        <button className='bg-red-500 rounded-lg hover: py-[2px] tracking-wider font-medium capitalize text-white text-[16px] px-2 text-clrprimary10 transition-all ease-linear duration-300 w-[100px] disabled:cursor-not-allowed block mr-3'>
                            Delete
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default StudentDetails