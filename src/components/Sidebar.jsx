import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logoLong from '../assets/1_332.svg';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="w-64 bg-white shadow-lg min-h-screen">
      {/* Logo */}
      <div className="p-6">
        <img src={logoLong} alt="Logo" className="w-36 h-8 object-contain" />
      </div>
      
      {/* Navigation Menu */}
      <nav className="mt-8">
        {/* Dashboard - Active */}
        <div 
          className={`px-6 py-4 cursor-pointer transition-colors ${
            isActive('/') 
              ? 'bg-blue-50 border-l-4 border-blue-500' 
              : 'hover:bg-gray-50'
          }`}
          onClick={() => handleNavigation('/')}
        >
          <div className="flex items-center">
            <div className={`w-5 h-5 rounded mr-4 flex items-center justify-center ${
              isActive('/') ? 'bg-blue-500' : 'bg-gray-400'
            }`}>
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">MEDICINE</p>
              <p className={`text-sm font-bold ${isActive('/') ? 'text-blue-500' : 'text-gray-700'}`}>
                Dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Appointments */}
        <div 
          className={`px-6 py-4 cursor-pointer transition-colors ${
            isActive('/appointments') 
              ? 'bg-blue-50 border-l-4 border-blue-500' 
              : 'hover:bg-gray-50'
          }`}
          onClick={() => handleNavigation('/appointments')}
        >
          <div className="flex items-center">
            <div className={`w-5 h-5 rounded mr-4 flex items-center justify-center ${
              isActive('/appointments') ? 'bg-blue-500' : 'bg-gray-400'
            }`}>
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">MEDICINE</p>
              <p className={`text-sm font-semibold ${isActive('/appointments') ? 'text-blue-500' : 'text-gray-700'}`}>
                Appointments
              </p>
            </div>
          </div>
        </div>

        {/* Doctors */}
        <div className="px-6 py-4 hover:bg-gray-50 cursor-pointer">
          <div className="flex items-center">
            <div className="w-5 h-5 bg-gray-400 rounded mr-4 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">MEDICINE</p>
              <p className="text-sm font-semibold text-gray-700">Doctors</p>
            </div>
          </div>
        </div>

        {/* Departments */}
        <div className="px-6 py-4 hover:bg-gray-50 cursor-pointer">
          <div className="flex items-center">
            <div className="w-5 h-5 bg-gray-400 rounded mr-4 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">MEDICINE</p>
              <p className="text-sm font-semibold text-gray-700">Departments</p>
            </div>
          </div>
        </div>

        {/* Patients */}
        <div className="px-6 py-4 hover:bg-gray-50 cursor-pointer">
          <div className="flex items-center">
            <div className="w-5 h-5 bg-gray-400 rounded mr-4 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">MEDICINE</p>
              <p className="text-sm font-semibold text-gray-700">Patients</p>
            </div>
          </div>
        </div>

        {/* Payments */}
        <div className="px-6 py-4 hover:bg-gray-50 cursor-pointer">
          <div className="flex items-center">
            <div className="w-5 h-5 bg-gray-400 rounded mr-4 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">MEDICINE</p>
              <p className="text-sm font-semibold text-gray-700">Payments</p>
            </div>
          </div>
        </div>

        {/* Help */}
        <div className="px-6 py-4 hover:bg-gray-50 cursor-pointer">
          <div className="flex items-center">
            <div className="w-5 h-5 bg-gray-400 rounded mr-4 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">MEDICINE</p>
              <p className="text-sm font-semibold text-gray-700">Help</p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
