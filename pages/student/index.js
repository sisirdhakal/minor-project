import React from 'react'
import { DashboardLayout } from '../../components/layout/dashboard';
import MainBody from '../../components/mainbody'

export default function DashboardPage({ cookie }) {
    return (
        <>
            <MainBody cookie={cookie} />
        </>
    )
}

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}

DashboardPage.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};