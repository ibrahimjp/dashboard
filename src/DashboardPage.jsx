import React from 'react';
import InfoCards from './components/InfoCards';
import HospitalSurvey from './components/HospitalSurvey';
import IncomeCharts from './components/IncomeCharts';
import AppointmentActivity from './components/AppointmentActivity';

const DashboardPage = () => {
  return (
    <>
      <InfoCards />
      <HospitalSurvey />
      <IncomeCharts />
      <AppointmentActivity />
    </>
  );
};

export default DashboardPage;
