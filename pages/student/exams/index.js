import React from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard';

function Exams() {
  return (
    <div>Exams</div>
  )
}

Exams.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Exams