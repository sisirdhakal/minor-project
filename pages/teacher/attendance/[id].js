import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard';

function AttendanceComp({ students }) {
    console.log(students)
    const { query } = useRouter()
    return (
        <div>
            AttendanceComp
        </div>
    )
}

export default AttendanceComp

export const getServerSideProps = async ({ req, query }) => {

    // console.log(query)
    const { id } = query
    let students = []
    try {
        const { data } = await axios.get(`http://localhost:8000/api/get-students-for-attendance/${id}/`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie
            }
        })
        students = data
    } catch (error) {
        console.log(error)
    }

    return {
        props: {
            students: students || []
        }
    };
}

AttendanceComp.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};