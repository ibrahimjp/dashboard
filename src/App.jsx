import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DashboardPage from './DashboardPage';
import NewPage from './pages/NewPage';
import AppointmentsPage from './pages/AppointmentsPage';

function App() {
  return (
    <Router>
      <div>
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="max-w-7xl mx-auto flex space-x-8">
            <Link 
              to="/" 
              className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              Original Dashboard
            </Link>
            <Link 
              to="/new-page" 
              className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              New Page
            </Link>
            <Link 
              to="/appointments" 
              className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              Appointments
            </Link>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/new-page" element={<NewPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;