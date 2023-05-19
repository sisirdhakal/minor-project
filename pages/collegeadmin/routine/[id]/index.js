import React from 'react'
import { DashboardLayout } from '../../../../components/layout/dashboard'
import { useRouter } from 'next/router'
import TeacherRoutineComp from '../../../../components/collgeadmin/routine/teacherRoutine'
import ClassRoutineComp from '../../../../components/collgeadmin/routine/classRoutine'
import AddRoutineComp from '../../../../components/collgeadmin/routine/addRoutine'
import EditRoutineComp from '../../../../components/collgeadmin/routine/editRoutine'

const AddRoutine = ({cookie}) => {
    const { query: { id } } = useRouter()

    return (
        <div>
            {
                id.startsWith("teacher") ? <TeacherRoutineComp cookie={cookie} id={id} /> :
                id.startsWith("class") ? <ClassRoutineComp cookie={cookie} id={id} /> :
                id === "add" ? <AddRoutineComp cookie={cookie} />:
                <EditRoutineComp cookie={cookie} id={id} /> 
            }
        </div>
    )
}

export default AddRoutine

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}

AddRoutine.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};