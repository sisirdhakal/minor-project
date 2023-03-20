import React, { useEffect, useState } from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard';

function Attendance() {
  return (
    <div>

    </div>
  )
}
Attendance.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Attendance