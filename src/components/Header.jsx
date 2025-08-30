import React, { useState, useEffect } from 'react';
import dashboardApiService from '../services/dashboardApiService';

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = dashboardApiService.getCurrentUserFromStorage();
        if (userData) {
          setUser(userData);
        } else {
          // Try to fetch from API if not in storage
          const response = await dashboardApiService.getCurrentUserProfile();
          if (response.success) {
            setUser(response.data.user);
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex-1 bg-dark-bg border-b border-light-black">
      <div className="flex items-center justify-between px-8 py-6">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-medium-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 01114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search"
              className="block w-full pl-12 pr-4 py-3 border border-light-black bg-dark-bg rounded-full focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent text-sm text-off-white placeholder-medium-gray"
            />
          </div>
        </div>
        
        {/* Right Side */}
        <div className="flex items-center space-x-6">
          {/* Notifications */}
          <div className="relative">
            <button className="p-2 text-medium-gray hover:text-off-white hover:bg-light-black rounded-full transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </button>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-green text-black text-xs rounded-full flex items-center justify-center font-bold">
              3
            </span>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-green rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-off-white">
                {user?.doctor?.name || user?.name || 'Dr. Sarah Wilson'}
              </p>
              <p className="text-xs text-medium-gray">
                {user?.doctor?.specialization || 'Cardiologist'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;