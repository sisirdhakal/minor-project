import React from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard';

function TeacherAttendance() {
    return (
        <div>TeacherAttendance</div>
    )
}

export default TeacherAttendance

TeacherAttendance.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};