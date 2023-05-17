import React from 'react'
import { DashboardLayout } from '../../components/layout/dashboard';
import CollegeAdmin from '../../components/collgeadmin';

export default function Admin({cookie}) {
    return (
        <div>
            <CollegeAdmin cookie={cookie} />
        </div>
    )
}

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}

Admin.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
