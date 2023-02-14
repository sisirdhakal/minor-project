import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { DashboardLayout } from '../../../components/layout/dashboard';

function TeacherAttendance({ data }) {

    return (
        <>
            <div>
                {
                    data.map(item => {
                        const { id, cLass, class_name, totalLectureDays, subject_name } = item
                        return <div key={id}>
                            <p>{subject_name}</p>
                        </div>
                    })
                }
            </div>
        </>
    )
}

export default TeacherAttendance

export const getServerSideProps = async ({ req }) => {
    const { data } = await axios.get("http://localhost:8000/api/get-lectures/", {
        withCredentials: true,
        headers: {
            Cookie: req.headers.cookie
        }
    })
    return {
        props: {
            data: data || []
        }
    };
}

TeacherAttendance.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};