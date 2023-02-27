import React from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard'
import AddNotice from '../../../components/notices/AddNotice'
import NoticeHero from '../../../components/notices/noticeHero'

function Notice() {
    return (
        <>
            <div>
                <NoticeHero />
                <div>
                    <AddNotice />
                </div>
            </div>
        </>
    )
}

export default Notice

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}


Notice.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};