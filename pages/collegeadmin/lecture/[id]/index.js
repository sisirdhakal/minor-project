import React from 'react'
import { DashboardLayout } from '../../../../components/layout/dashboard'
import CollegeAdminHero from '../../../../components/collgeadmin/collegeAdminHero'
import AddLectureComp from '../../../../components/collgeadmin/lecture/addLecture'
import EditLectureComp from '../../../../components/collgeadmin/lecture/editLecture'
import ClassLectureComp from '../../../../components/collgeadmin/lecture/classLecture'
import TeacherLectureComp from '../../../../components/collgeadmin/lecture/teacherLecture'
import { useRouter } from 'next/router'

const AddLecture = ({cookie}) => {
    const { query: { id } } = useRouter()

    return (
        <div>
            {
                id.startsWith("teacher") ? <TeacherLectureComp cookie={cookie} id={id} /> :
                id.startsWith("class") ? <ClassLectureComp cookie={cookie} id={id} /> :
                id === "add" ? <AddLectureComp cookie={cookie} />:
                <EditLectureComp cookie={cookie} id={id} /> 
            }
        </div>
    )
}

export default AddLecture

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}

AddLecture.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};