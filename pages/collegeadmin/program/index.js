import React, {useEffect} from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard'
import CollegeAdminHero from '../../../components/collgeadmin/collegeAdminHero'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../../redux'
import { toast } from 'react-hot-toast'
import Link from 'next/link'

const Program = ({ cookie }) => {
    const dispatch = useDispatch()
    const { allPrograms } = useSelector(state => state.collegeadmin)
    const { setAllPrograms } = bindActionCreators(actionCreators, dispatch)
    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/admin/program/`, {
                    withCredentials: true,
                    headers: {
                        "X-CSRFTOKEN": cookie.csrftoken
                    }
                })
                if (data) {
                    setAllPrograms(data)
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
            <CollegeAdminHero title={"Program"} image={"/assets/images/program.svg"} button={"Add"} url={"/collegeadmin/program/add"} />
            <div className='grid grid-cols-2 gap-y-6 gap-x-10 mb-10'>
                {
                    allPrograms?.map(item => {
                        return <div key={item.id} className='w-full px-4 py-2 bg-white rounded'>
                            <div className='col-span-3 text-xl text-[#023E8A] text-medium'>
                                {item.name}
                            </div>
                            <div className='my-2'>
                                <p className='text-sm text-clrgrey5'>Department :</p>
                                <p className='text-md'>{item.department_name}</p>
                            </div>
                            <div className='flex gap-x-3 mt-3'>
                                <Link href={`/collegeadmin/program/${item.id}`}>
                                    <button className='bg-[#2091F9] rounded-lg hover: py-[2px] tracking-wider font-medium capitalize text-white text-[14px] px-2 text-clrprimary10 transition-all ease-linear duration-300 w-[70px] disabled:cursor-not-allowed block'>
                                        Edit
                                    </button>
                                </Link>
                                <button className='bg-red-500 rounded-lg hover: py-[2px] tracking-wider font-medium capitalize text-white text-[14px] px-2 text-clrprimary10 transition-all ease-linear duration-300 w-[70px] disabled:cursor-not-allowed block'>
                                    Delete
                                </button>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Program

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}

Program.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};