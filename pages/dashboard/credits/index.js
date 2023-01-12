import React from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard';

function Credits() {
  return (
    <div>Credits</div>
  )
}
Credits.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Credits