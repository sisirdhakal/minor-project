import React, { use, useEffect, useState } from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard'
import CollegeAdminHero from '../../../components/collgeadmin/collegeAdminHero'
import { BsSearch } from 'react-icons/bs'
import axios from 'axios'
import Link from 'next/link'

const Teacher = ({ cookie }) => {

    const [searchKey, setsearchKey] = useState("")
    const [searchResults, setsearchResults] = useState([])
    const [process, setprocess] = useState("Search")

    const handleSearch = () => {

    }
    const getData = async () => {
        setprocess("Searching...")
        setsearchResults([])
        try {
            const { data } = await axios.get(`http://localhost:8000/api/admin/teacher?search=${searchKey}`, {
                withCredentials: true,
                headers: {
                    "X-CSRFTOKEN": cookie.csrftoken
                }
            })
            if (data) {
                setsearchResults(data)
                setprocess("Search")
            }

        } catch (error) {
            if (error.response?.data.msg) {
                setprocess("Search")
                toast.error(error.response.data.msg)
            }
        }

    }





    return (
        <div>
            <CollegeAdminHero title={"Teacher"} image={"/assets/images/teacher.svg"} button={"Add"} url={"/collegeadmin/teacher/add"} />
            <div className='bg-white pl-10 pr-9 flex items-center'>
                <div>
                    <BsSearch className='w-5 h-5 text-clrgrey2' />
                </div>
                <input
                    value={searchKey}
                    onChange={(e) => { setsearchKey(e.target.value) }}
                    type="text"
                    name='title'
                    placeholder='Search Teacher'
                    className='rounded text-gray-700 h-12 focus:ring-0 outline-none border-0 ring-0 border-[#CAF0F8] w-full bg-white focus:border-0 placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide' />

                <button disabled={process === "Search" ? false : true} className='bg-[#2091F9] rounded-lg hover: py-[4px] tracking-wider font-medium capitalize text-white text-[16px] px-3 text-clrprimary10 transition-all ease-linear duration-300 w-40 disabled:cursor-not-allowed' onClick={getData}>
                    {process}
                </button>
            </div>
            <div className='mt-10'>
                <div className='h-full bg-white rounded-sm w-full px-8 py-6'>
                    <p className='text-[#023E8A] text-2xl mb-5'>
                        Search Results for {searchKey ? `"${searchKey}"` : "..."}
                    </p>

                    <div>
                        {
                            searchResults?.map(item => {
                                const { user_profile, id, department_name } = item;
                                return <Link href={`/collegeadmin/teacher/${id}`}>
                                    <div key={id}>
                                        <p className='text-[18px] text-clrgrey1 hover:text-[#00B4D8] transition-all duration-200 ease-in-out cursor-pointer font-medium' >
                                            {user_profile?.firstName} {user_profile?.middleName} {user_profile?.lastName} - {department_name}
                                        </p>
                                    </div>
                                </Link>
                            })
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Teacher

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}

Teacher.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};