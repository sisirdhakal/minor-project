import React from 'react'
import { DashboardLayout } from '../../../../components/layout/dashboard';
import { useRouter } from 'next/router';
import AddApplication from '../../../../components/student/addApplication';
import EditApplication from '../../../../components/student/editApplication';

const ApplicationsViews = ({ cookie }) => {

    const { query: { id } } = useRouter()

    return (
        <>
            {
                id === "add" ?
                    <AddApplication cookie={cookie} /> :
                    <EditApplication cookie={cookie} />
            }
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

ApplicationsViews.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default ApplicationsViews