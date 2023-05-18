import React from 'react'
import NoticeHero from '../../../../components/notices/noticeHero';
import { DashboardLayout } from '../../../../components/layout/dashboard';
import { useRouter } from 'next/router';
import AddNotice from '../../../../components/notices/AddNotice';
import SingleNotice from '../../../student/notices/[id]';
import NoticeDetails from '../../../../components/notices/NoticeDetails';

function NoticeComponents({ cookie }) {

    const { query: { id } } = useRouter()

    return (
        <>
            {
                id === "add" ? <AddNotice cookie={cookie} /> : <NoticeDetails cookie={cookie} id={id} />
            }
        </>
    )
}

export default NoticeComponents

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}


NoticeComponents.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};