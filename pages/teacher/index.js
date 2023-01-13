import React from 'react'
import { DashboardLayout } from '../../components/layout/dashboard';

export default function Teacher() {
    return (
        <div>Teacher</div>
    )
}

Teacher.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
