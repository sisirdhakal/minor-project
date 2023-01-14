import React from 'react'
import { DashboardLayout } from '../../components/layout/dashboard';

export default function Parent() {
    return (
        <div>Parent</div>
    )
}
Parent.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
