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
            <div className='h-full pb-10'>
                {/* <Link href={"/dashboard/notices"}>
                    <button className='bg-[#2091F9] rounded-lg hover: py-[4px] tracking-wider font-medium text-white px-4 text-clrprimary10 transition-all ease-linear duration-300 hover:text-clrgrey2 hover:bg-slate-300'>
                        Back to Notices
                    </button>
                </Link> */}
                <div>

                    <NoticeHero title={"BE Admission 2079 Detail Notice"} />
                </div>
                <div className='bg-white rounded overflow-y-scroll scrollbar-hide py-2 px-8'>
                    <div className='mb-4'>
                        <span className='border-b-2 font-bold text-primary-text py-[2px] px-1 border-secondary-text'>10 January, 2023</span>
                    </div>
                    <div>
                        <p className='font-semibold text-clrgrey2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus culpa dolorem, optio quae ab exercitationem provident! Eveniet quisquam eligendi temporibus, beatae doloribus, quidem accusamus ea incidunt quo illo excepturi ad molestiae molestias minus aliquid dolorum sunt sequi sit maiores ex natus explicabo consectetur sed iste. Vel vero rem magnam voluptatum vitae excepturi et eos, esse nesciunt nobis tempore, quo autem illum dolor id quae. Eum recusandae consequuntur quasi rerum tenetur amet omnis aperiam excepturi autem earum reiciendis, quod, ut adipisci error nostrum. Hic quis ducimus doloribus quae quos incidunt ex recusandae sed et praesentium error obcaecati iste, magnam est? Atque?</p>

                    </div>
                    <div className=" mx-auto pointer-events-auto py-5">
                        <iframe
                            src="/assets/resume.pdf"
                            className="h-[90vh] w-full rounded pointer-events-auto"
                        ></iframe>
                    </div>
                </div>
            </div>
        </>
    )
}

SingleNotice.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default SingleNotice