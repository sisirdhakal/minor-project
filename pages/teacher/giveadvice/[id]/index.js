import React from 'react'
import { useRouter } from 'next/router';
import { DashboardLayout } from '../../../../components/layout/dashboard';
import AddAdviceComp from '../../../../components/teacher/advices/AddAdvice';

function AdvicesComponents({ cookie }) {

    const { query: { id } } = useRouter()

    return (
        <>
            {
                id === "add" ? <AddAdviceComp cookie={cookie} /> : <div></div>
            }
        </>
    )
}

export default AdvicesComponents

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}


AdvicesComponents.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};