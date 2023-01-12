import React from 'react'
import { DashboardLayout } from '../../components/layout/dashboard';
import MainBody from '../../components/mainbody'

export default function DashboardPage() {
    return (
        <>
            <MainBody />
        </>
    )
}

DashboardPage.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};