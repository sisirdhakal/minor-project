import React from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard';

function Results() {
  return (
    <div>Results</div>
  )
}

Results.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Results