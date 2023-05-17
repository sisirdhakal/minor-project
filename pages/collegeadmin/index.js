import React from 'react'
import { DashboardLayout } from '../../components/layout/dashboard';
import CollegeAdmin from '../../components/collgeadmin';

export default function Admin() {
    return (
        <div>
            <CollegeAdmin />
        </div>
    )
}

Admin.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
