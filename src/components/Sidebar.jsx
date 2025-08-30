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
    <div className="w-64 bg-dark-bg border-r border-light-black min-h-screen">
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
              ? 'bg-primary-green/10 border-l-4 border-primary-green' 
              : 'hover:bg-light-black/50'
          }`}
          onClick={() => handleNavigation('/')}
        >
          <div className="flex items-center">
            <div className={`w-5 h-5 rounded mr-4 flex items-center justify-center ${
              isActive('/') ? 'bg-primary-green' : 'bg-medium-gray'
            }`}>
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </div>
            <div>
              <p className="text-xs text-medium-gray uppercase font-bold tracking-wider">MEDICINE</p>
              <p className={`text-sm font-bold ${isActive('/') ? 'text-primary-green' : 'text-off-white'}`}>
                Dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Appointments */}
        <div 
          className={`px-6 py-4 cursor-pointer transition-colors ${
            isActive('/appointments') 
              ? 'bg-primary-green/10 border-l-4 border-primary-green' 
              : 'hover:bg-light-black/50'
          }`}
          onClick={() => handleNavigation('/appointments')}
        >
          <div className="flex items-center">
            <div className={`w-5 h-5 rounded mr-4 flex items-center justify-center ${
              isActive('/appointments') ? 'bg-primary-green' : 'bg-medium-gray'
            }`}>
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <p className="text-xs text-medium-gray uppercase font-bold tracking-wider">MEDICINE</p>
              <p className={`text-sm font-semibold ${isActive('/appointments') ? 'text-primary-green' : 'text-off-white'}`}>
                Appointments
              </p>
            </div>
          </div>
        </div>

      </nav>
    </div>
  );
};

export default Sidebar;
