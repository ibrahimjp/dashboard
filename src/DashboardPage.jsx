import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import InfoCards from './components/InfoCards';
import HospitalSurvey from './components/HospitalSurvey';
import IncomeCharts from './components/IncomeCharts';
import AppointmentActivity from './components/AppointmentActivity';

const DashboardPage = () => {
  return (
    <div className="flex bg-[#F6F8FB] min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <InfoCards />
          <HospitalSurvey />
          <IncomeCharts />
          <AppointmentActivity />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
