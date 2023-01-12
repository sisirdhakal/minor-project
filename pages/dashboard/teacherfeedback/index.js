import React from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard';

function TeacherFeedbacks() {
  return (
    <div>TeacherFeedbacks</div>
  )
}

TeacherFeedbacks.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default TeacherFeedbacks