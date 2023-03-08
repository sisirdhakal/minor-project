import React from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard'
import AddNotice from '../../../components/notices/AddNotice'
import NoticeHero from '../../../components/notices/noticeHero'

function Notice({ cookie }) {
    return (
        <>
            <div className='grid grid-rows-rowauto h-full'>
                <NoticeHero />
                <div className='pb-10'>
                    <AddNotice cookie={cookie} />
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