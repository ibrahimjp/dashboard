import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './DashboardPage';
import NewPage from './pages/NewPage';
import AppointmentsPage from './pages/AppointmentsPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/new-page" element={<NewPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;