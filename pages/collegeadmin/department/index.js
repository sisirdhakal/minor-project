import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DashboardLayout } from '../../../components/layout/dashboard'
import CollegeAdminHero from '../../../components/collgeadmin/collegeAdminHero'
import axios from 'axios'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../../redux'
import { setAllDepartments } from '../../../redux/actionCreators'
import { GrMailOption, GrPhone, GrUserExpert } from 'react-icons/gr';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import DeleteDepartmentModal from '../../../components/collgeadmin/department/deleteModal'
import { toast } from 'react-hot-toast'

const Department = ({ cookie }) => {
    const { data, success } = useSelector(state => state.collegeadmin.allDepartments)
    const dispatch = useDispatch()
    const { setAllDepartments } = bindActionCreators(actionCreators, dispatch)

    const [showModal, setShowModal] = useState(false)
    const [activeId, setactiveId] = useState(null)

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/admin/department/`, {
                    withCredentials: true,
                    headers: {
                        "X-CSRFTOKEN": cookie.csrftoken
                    }
                })
                if (data) {
                    console.log("success")
                    setAllDepartments(data)
                }

            } catch (error) {
                if (error.response?.data.msg) {
                    toast.error(error.response.data.msg)
                }
            }

        }
        if(!success){
            getData()
        }
    }, [])

    const handleClick = (id) => {
        setactiveId(id)
        setShowModal(true)

    }

    return (
        <div>
            <CollegeAdminHero title={"Department"} image={"/assets/images/exam.svg"} button={"Add"} url={"/collegeadmin/department/add"} />

            <div className='grid gap-y-6 mb-10'>
                {
                    data?.map(item => {
                        return <div key={item.id} className='w-full px-4 py-2 bg-white rounded'>
                            <div className='grid grid-cols-4'>
                                <div className='col-span-3 text-xl text-[#023E8A] text-medium'>
                                    {item.name}
                                </div>
                                <div className='col-span-1 flex justify-end'>
                                    <Link href={`/collegeadmin/department/${item.id}`}>
                                        <button className='bg-[#2091F9] rounded-lg hover: py-[2px] font-medium capitalize text-white text-[16px] px-2 text-clrprimary10 transition-all ease-linear duration-300 w-[70px] disabled:cursor-not-allowed block mx-2'>
                                            Edit
                                        </button>
                                    </Link>
                                    <button className='bg-red-500 rounded-lg hover: py-[2px] font-medium capitalize text-white text-[16px] px-2 text-clrprimary10 transition-all ease-linear duration-300 w-[70px] disabled:cursor-not-allowed block mx-2' onClick={() => { handleClick(item.id) }}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <div>
                                <p className='text-xs text-clrgrey3 mt-2'>
                                    {item.description}
                                </p>
                            </div>
                            <div className='grid grid-cols-2'>
                                <div className='col-span-1'>
                                    <Link href={`mailto:${item.mail}`}>
                                        <p className='text-md my-1 flex items-center space-x-3 hover:text-[#023E8A]'>
                                            <GrMailOption /> <span className='text-sm font-medium'>{item.mail}</span>
                                        </p>
                                    </Link>
                                    <Link href={`telto:${item.contact}`}>
                                        <p className='text-md my-1 flex items-center space-x-3 hover:text-[#023E8A]'>
                                            <GrPhone /> <span className='text-sm font-medium'>{item.contact}</span>
                                        </p>
                                    </Link>
                                </div>
                                <div className='col-span-1'>
                                    <Link href={`/collegeadmin/teacher/${item.headOfDepartment}`}>
                                        <p className='text-md my-1 flex items-center space-x-3 hover:text-[#023E8A]'>
                                            <GrUserExpert /> <span className='text-sm'>HOD: <span className='font-medium'>{item.hod_name}</span></span>
                                        </p>
                                    </Link>
                                    <Link href='#'>
                                        <p className='text-md my-1 flex items-center space-x-3 hover:text-[#023E8A]'>
                                            <GrUserExpert /> <span className='text-sm'>DHOD: <span className='font-medium'>{item.dhod_name}</span></span>
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>

            <div>
                <DeleteDepartmentModal showModal={showModal} setShowModal={setShowModal} cookie={cookie} id={activeId} />
            </div>

        </div>
    )
}

export default Department

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}

Department.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};