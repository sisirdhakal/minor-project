import React, { useEffect, useState } from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard'
import CollegeAdminHero from '../../../components/collgeadmin/collegeAdminHero'
import { BsSearch } from 'react-icons/bs'
import axios from 'axios'

const Student = ({ cookie }) => {

    const [searchKey, setsearchKey] = useState("")
    const [searchResults, setsearchResults] = useState([])

    const handleSearch = () => {

    }

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/admin/student?search=${searchKey}`, {
                    withCredentials: true,
                    headers: {
                        "X-CSRFTOKEN": cookie.csrftoken
                    }
                })
                if (data) {
                    console.log(data)
                }

            } catch (error) {
                if (error.response?.data.msg) {
                    toast.error(error.response.data.msg)
                }
            }

        }
        getData()
    }, [searchKey])


    return (
        <div>
            <CollegeAdminHero title={"Student"} image={"/assets/images/student.svg"} button={"Add"} url={"/collegeadmin/student/add"} />
            <div className='bg-white px-10 flex items-center'>
                <div>
                    <BsSearch className='w-5 h-5 text-clrgrey2' />
                </div>
                <input
                    value={searchKey}
                    onChange={(e) => { setsearchKey(e.target.value) }}
                    type="text"
                    name='title'
                    placeholder='Search Student'
                    className='rounded text-gray-700 h-12 focus:ring-0 outline-none border-0 ring-0 border-[#CAF0F8] w-full bg-white focus:border-0 placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide' />
            </div>
            <div className='mt-10'>
                <div className='h-full bg-white rounded-sm w-full px-8 py-6'>
                    <p className='text-[#023E8A] text-xl'>
                        Search Results for {`"${searchKey}"`}
                    </p>

                    <div>
                        {
                            searchResults?.map(item => {
                                console.log(item)
                                const { } = item;
                                return true;
                            })
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Student

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}

Student.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};