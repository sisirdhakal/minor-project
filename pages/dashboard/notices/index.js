import React from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard';

function Notices() {
    return (
        <div>
            Notices
        </div>
    )
}

Notices.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default Notices