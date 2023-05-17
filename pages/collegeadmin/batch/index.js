import React, { useEffect, useState } from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard'
import CollegeAdminHero from '../../../components/collgeadmin/collegeAdminHero'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../../redux'
import Link from 'next/link'
import EditBatch from '../../../components/collgeadmin/editbatch'

const Batch = ({ cookie }) => {
    const { allBatches } = useSelector(state => state.collegeadmin)
    const dispatch = useDispatch()
    const { setAllBatches } = bindActionCreators(actionCreators, dispatch)

    const [editBatch, seteditBatch] = useState(false)
    const [batchId, setbatchId] = useState(null)

    const handleEdit = () => {

    }

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/admin/batch/`, {
                    withCredentials: true,
                    headers: {
                        "X-CSRFTOKEN": cookie.csrftoken
                    }
                })
                if (data) {
                    console.log("success")
                    setAllBatches(data)
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
            <CollegeAdminHero title={"Batch"} image={"/assets/images/attendance.svg"} button={"Add"} url={"/collegeadmin/batch/add"} />

            {
                editBatch ? <div>
                    <EditBatch />
                </div> :
                    <div className='grid grid-cols-4 gap-x-20 gap-y-6' >
                        {
                            allBatches?.map(item => {
                                return <div key={item.id} className='w-full px-4 py-2 bg-white rounded h-24'>
                                    <div className='text-center text-xl text-[#023E8A] text-medium mb-2'>
                                        <p>
                                            Batch of {item.year}
                                        </p>
                                        <p className='text-xs text-clrgrey3'>
                                            {
                                                item.graduated ?
                                                    "Graduated"
                                                    :
                                                    item.startedFrom

                                            }
                                        </p>
                                    </div>
                                    <div className='flex justify-center items-center'>

                                        <button className='bg-[#2091F9] rounded-lg hover: py-[2px] tracking-wider font-medium capitalize text-white text-[14px] px-2 text-clrprimary10 transition-all ease-linear duration-300 w-[70px] disabled:cursor-not-allowed block mx-auto' onClick={() => { seteditBatch(true) }} >
                                            Edit
                                        </button>
                                        <button className='bg-red-500 rounded-lg hover: py-[2px] tracking-wider font-medium capitalize text-white text-[14px] px-2 text-clrprimary10 transition-all ease-linear duration-300 w-[70px] disabled:cursor-not-allowed block mx-auto'>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            })
                        }
                    </div>
            }
        </div>
    )
}

export default Batch

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}

Batch.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};