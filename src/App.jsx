import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Layout from './components/Layout';
import DashboardPage from './DashboardPage';
import NewPage from './pages/NewPage';
import AppointmentsPage from './pages/AppointmentsPage';
import LoginPage from './components/LoginPage';

function AppContent() {
  // Commented out authentication check to show dashboard directly
  // const { isAuthenticated, isLoading } = useAuth();

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-black flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green"></div>
  //     </div>
  //   );
  // }

  return (
    <Router>
      <Routes>
        {/* <Route 
          path="/login" 
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />} 
        /> */}
        <Route 
          path="/*" 
          element={
            // Always show dashboard - authentication bypassed
            <Layout>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/new-page" element={<NewPage />} />
                <Route path="/appointments" element={<AppointmentsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
            // Commented out authentication check
            // isAuthenticated ? (
            //   <Layout>
            //     <Routes>
            //       <Route path="/" element={<DashboardPage />} />
            //       <Route path="/new-page" element={<NewPage />} />
            //       <Route path="/appointments" element={<AppointmentsPage />} />
            //       <Route path="*" element={<Navigate to="/new-page" replace />} />
            //     </Routes>
            //   </Layout>
            // ) : (
            //   <Navigate to="/login" replace />
            // )
          } 
        />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;