import React, { useState, useEffect } from 'react';
import dashboardApiService from '../services/dashboardApiService';

const InfoCards = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const response = await dashboardApiService.getDoctorStats();
        if (response.success) {
          setStats(response.data.stats);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (dashboardApiService.isAuthenticated() && dashboardApiService.isDoctor()) {
      fetchStats();
    } else {
      setIsLoading(false);
    }
  }, []);

  const cards = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      value: isLoading ? '---' : (stats?.totalBookings || '0'),
      label: 'Total Appointments',
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      value: isLoading ? '---' : (stats?.pendingBookings || '0'),
      label: 'Pending Bookings',
      color: 'bg-green-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      value: isLoading ? '---' : (stats?.completedBookings || '0'),
      label: 'Completed',
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      value: isLoading ? '---' : `₹ ${stats?.monthlyIncome ? (stats.monthlyIncome / 100).toLocaleString() : '0'}`,
      label: 'Monthly Earnings',
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50'
    }
  ];

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">Error loading dashboard stats: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-light-black rounded-xl shadow-sm border border-zinc-800 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}>
              <div className={`${card.color} text-white`}>
                {card.icon}
              </div>
            </div>
            <div className="text-right">
            <p className="text-2xl font-bold text-off-white">{card.value}</p>
            <p className="text-sm text-medium-gray">{card.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoCards;
