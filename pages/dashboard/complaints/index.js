import React from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard';

function Complaints() {
  return (
    <div>Complaints</div>
  )
}

Complaints.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Complaints