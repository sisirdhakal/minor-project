import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { DashboardLayout } from '../../../../components/layout/dashboard'
import NoticeHero from '../../../../components/notices/noticeHero'

function SingleNotice() {
    const router = useRouter()
    const { id } = router.query
    return (
        <>
            <div>
                {/* <Link href={"/dashboard/notices"}>
                    <button className='bg-[#2091F9] rounded-lg hover: py-[4px] tracking-wider font-medium text-white px-4 text-clrprimary10 transition-all ease-linear duration-300 hover:text-clrgrey2 hover:bg-slate-300'>
                        Back to Notices
                    </button>
                </Link> */}
                <NoticeHero title={"BE Admission 2079 Detail Notice"} />
            </div>
        </>
    )
}

SingleNotice.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default SingleNotice