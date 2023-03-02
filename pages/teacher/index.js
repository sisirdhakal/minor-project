import React from 'react'
import { DashboardLayout } from '../../components/layout/dashboard';
import MainBody from '../../components/mainbody';

export default function Teacher() {
    return (
        <div><MainBody /> </div>
    )
}

Teacher.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
