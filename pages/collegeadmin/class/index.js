import React, { useEffect, useState } from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard'
import CollegeAdminHero from '../../../components/collgeadmin/collegeAdminHero'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../../redux'
import Link from 'next/link'
import { GrUserExpert } from 'react-icons/gr';
import DeleteClassModal from '../../../components/collgeadmin/class/deleteModal'

const ClassComp = ({ cookie }) => {
    const { allClasses } = useSelector(state => state.collegeadmin)
    const dispatch = useDispatch()
    const { setAllClasses } = bindActionCreators(actionCreators, dispatch)

    const [showModal, setShowModal] = useState(false)
    const [activeId, setactiveId] = useState(null)

    const handleClick = (id) => {
        setactiveId(id)
        setShowModal(true)

    }

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/admin/class/`, {
                    withCredentials: true,
                    headers: {
                        "X-CSRFTOKEN": cookie.csrftoken
                    }
                })
                if (data) {
                    console.log("success")
                    setAllClasses(data)
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
            <CollegeAdminHero title={"Class"} image={"/assets/images/class.svg"} button={"Add"} url={"/collegeadmin/class/add"} />
            <div className='grid grid-cols-2 gap-y-6 gap-x-10 mb-10'>
                {
                    allClasses?.map(item => {
                        return <div key={item.id} className='w-full px-4 py-2 bg-white rounded'>
                            <div className='col-span-3 text-xl text-[#023E8A] text-medium'>
                                {item.name} - Semester: {item.semester}
                            </div>
                            <div className='my-2'>
                                <p className='text-sm text-clrgrey5'>Batch</p>
                                <p className='text-md'>{item.batch_name}</p>
                            </div>
                            <div className='my-2'>
                                <p className='text-sm text-clrgrey5'>Department</p>
                                <p className='text-md'>{item.department_name}</p>
                            </div>
                            <div className='my-2'>
                                <p className='text-sm text-clrgrey5'>Program</p>
                                <p className='text-md'>{item.program_name}</p>
                            </div>
                            <Link href={`/collegeadmin/student/${item.classRepresentative}`}>
                                <p className='text-md my-2 flex items-center space-x-3 hover:text-[#023E8A]'>
                                    <GrUserExpert /> <span className='text-sm'>CR: <span className='font-medium'>{item.cr_name}</span></span>
                                </p>
                            </Link>
                            <Link href={`/collegeadmin/student/${item.viceClassRepresentative}`}>
                                <p className='text-md my-2 flex items-center space-x-3 hover:text-[#023E8A]'>
                                    <GrUserExpert /> <span className='text-sm'>VCR: <span className='font-medium'>{item.vcr_name}</span></span>
                                </p>
                            </Link>
                            <div className='flex justify-center items-center gap-x-3'>
                                <Link href={`/collegeadmin/class/${item.id}`}>
                                    <button className='bg-[#2091F9] rounded-lg hover: py-[2px] tracking-wider font-medium capitalize text-white text-[14px] px-2 text-clrprimary10 transition-all ease-linear duration-300 w-[70px] disabled:cursor-not-allowed block'>
                                        Edit
                                    </button>
                                </Link>
                                <button className='bg-red-500 rounded-lg hover: py-[2px] tracking-wider font-medium capitalize text-white text-[14px] px-2 text-clrprimary10 transition-all ease-linear duration-300 w-[70px] disabled:cursor-not-allowed block' onClick={() => { handleClick(item.id) }}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    })
                }
            </div>
            <div>
                <DeleteClassModal showModal={showModal} setShowModal={setShowModal} cookie={cookie} id={activeId} />
            </div>
        </div>
    )
}

export default ClassComp

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}

ClassComp.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};