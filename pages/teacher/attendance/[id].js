import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import CenteredLoading from '../../../common/Loader';
import AddAttendance from '../../../components/attendance/AddAttendance';
import EditAttendance from '../../../components/attendance/EditAttendance';
import ViewAttendance from '../../../components/attendance/ViewAttendance';
import { DashboardLayout } from '../../../components/layout/dashboard';
import { actionCreators } from '../../../redux';

function AttendanceComp({ cookies }) {

    const { query: { id: lectureId, type } } = useRouter()
    const dispatch = useDispatch()
    const { fetchSingleLecture, fetchPracticalLabs, fetchTheoryLectures } = bindActionCreators(actionCreators, dispatch)
    const { theoryLectures, practicalLectures, singleLecture } = useSelector(state => state.teachersData)
    const { attendanceType } = useSelector(state => state.attendance)
    useEffect(() => {
        if (theoryLectures.length) {
            fetchSingleLecture(lectureId, theoryLectures)
        }
    }, [attendanceType, theoryLectures, practicalLectures, singleLecture, lectureId])

    useEffect(() => {
        if (attendanceType !== "th") {
            !practicalLectures.length && fetchPracticalLabs(cookies)
        }
        else {
            !theoryLectures.length && fetchTheoryLectures(cookies)
        }
    }, [attendanceType, theoryLectures, practicalLectures])


    return (
        <div className=''>
            <div className='relative bg-white px-4 py-2 w-full h-full rounded-sm'>
                {
                    singleLecture ? (<div>
                        <h1 className='text-primary-text text-lg mb-3 font-semibold capitalize'>{singleLecture?.department_name}</h1>
                        <div className=' items-center flex'>
                            <h1 className='text-clrgrey1 mb-1 font-bold text-lg'>Class : <span >{singleLecture?.class_name}</span></h1>
                        </div>
                        <div className=' items-center flex'>
                            <h1 className='text-clrgrey1 mb-3 font-bold text-lg'>{singleLecture?.subject_name}</h1>
                        </div>
                    </div>) : (
                        <div className='py-6 bg-white rounded-md'>
                            <p className='text-secondary-text text-center text-lg font-medium'>Loading Lecture's Details ...</p>
                            <CenteredLoading />
                        </div>
                    )
                }

            </div>
            <div>
                {
                    type === "view" ? (<ViewAttendance cookies={cookies} />) : type === "edit" ? (<EditAttendance cookies={cookies} />) : (<AddAttendance cookies={cookies} />)
                }
            </div>


        </div>
    )
}

export default AttendanceComp

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookies: req.cookies
        }
    };
}

AttendanceComp.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};