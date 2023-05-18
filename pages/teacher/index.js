import React from 'react'
import { DashboardLayout } from '../../components/layout/dashboard';
import MainBody from '../../components/mainbody';

export default function Teacher() {
    return (
        <div>
        </div>
    )
}

Teacher.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
