import axios from 'axios';
import Link from 'next/link';
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DashboardLayout } from '../../../components/layout/dashboard';
import LecturesComp from '../../../components/lectures';
import { actionCreators } from '../../../redux';
import { getPracticalLectures, getTheoryLectures } from '../../../utils/teachersAttendance/getLectures';

function TeacherAttendance({ cookie }) {

    const dispatch = useDispatch()
    const { setAttendanceType } = bindActionCreators(actionCreators, dispatch)
    const { attendanceType } = useSelector(state => state.attendance)

    useEffect(() => {

        const fetchLectures = async () => {
            const theoryLectures = await getTheoryLectures(cookie)
        }

    }, [])


    return (
        <>
            <div>
                <div className='grid grid-cols-2 gap-32'>
                    <button className={`bg-white rounded-lg py-2 items-center ${attendanceType === "th" ? "shadow-md shadow-green-500" : ""} text-start flex px-5`} onClick={() => { setAttendanceType("th") }}>
                        <p className='text-primary-text font-bold text-[1rem] my-auto '>Theory Lectures</p>
                    </button>
                    <button className={`bg-white rounded-lg py-2 text-start items-center px-5 ${attendanceType === "pr" ? "shadow-md shadow-green-500" : ""}`} onClick={() => { setAttendanceType("pr") }}>
                        <p className='text-primary-text my-auto font-bold text-[1rem]'>Practical Labs</p>
                    </button>
                </div>
                {/* <div className='py-5'>
                    {
                        attendanceType === "th" ?
                            (<LecturesComp lectures={theory} />) : (
                                <LecturesComp lectures={practical} />
                            )
                    }
                </div> */}
            </div>
        </>
    )
}

export default TeacherAttendance

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}


TeacherAttendance.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};