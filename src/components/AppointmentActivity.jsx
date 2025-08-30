import React, { useState, useEffect } from 'react';
import dashboardApiService from '../services/dashboardApiService';

const AppointmentActivity = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setIsLoading(true);
        const response = await dashboardApiService.getDoctorBookings({ limit: 10 });
        if (response.success) {
          setAppointments(response.data.bookings || []);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching appointments:', err);
        // Fallback to mock data for development
        setAppointments([
          {
            id: 1,
            user: { name: 'Leslie Alexander', email: 'leslie.alexander@example.com' },
            createdAt: '2024-01-15T09:15:00Z',
            slot: { startTime: '2024-01-15T09:15:00Z', endTime: '2024-01-15T09:45:00Z' },
            status: 'CONFIRMED'
          },
          {
            id: 2,
            user: { name: 'Ronald Richards', email: 'ronald.richards@example.com' },
            createdAt: '2024-01-16T12:00:00Z',
            slot: { startTime: '2024-01-16T12:00:00Z', endTime: '2024-01-16T12:45:00Z' },
            status: 'PENDING'
          },
          {
            id: 3,
            user: { name: 'Jane Cooper', email: 'jane.cooper@example.com' },
            createdAt: '2024-01-17T13:15:00Z',
            slot: { startTime: '2024-01-17T13:15:00Z', endTime: '2024-01-17T13:45:00Z' },
            status: 'COMPLETED'
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    if (dashboardApiService.isAuthenticated() && dashboardApiService.isDoctor()) {
      fetchAppointments();
    } else {
      // Mock data for non-authenticated users
      setAppointments([
        {
          id: 1,
          user: { name: 'Leslie Alexander', email: 'leslie.alexander@example.com' },
          createdAt: '2024-01-15T09:15:00Z',
          slot: { startTime: '2024-01-15T09:15:00Z', endTime: '2024-01-15T09:45:00Z' },
          status: 'CONFIRMED'
        },
        {
          id: 2,
          user: { name: 'Ronald Richards', email: 'ronald.richards@example.com' },
          createdAt: '2024-01-16T12:00:00Z',
          slot: { startTime: '2024-01-16T12:00:00Z', endTime: '2024-01-16T12:45:00Z' },
          status: 'PENDING'
        },
        {
          id: 3,
          user: { name: 'Jane Cooper', email: 'jane.cooper@example.com' },
          createdAt: '2024-01-17T13:15:00Z',
          slot: { startTime: '2024-01-17T13:15:00Z', endTime: '2024-01-17T13:45:00Z' },
          status: 'COMPLETED'
        }
      ]);
      setIsLoading(false);
    }
  }, []);

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await dashboardApiService.updateBookingStatus(bookingId, newStatus);
      // Refresh appointments
      const response = await dashboardApiService.getDoctorBookings({ limit: 10 });
      if (response.success) {
        setAppointments(response.data.bookings || []);
      }
    } catch (err) {
      console.error('Error updating booking status:', err);
      alert('Failed to update booking status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'CONFIRMED': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED': return 'bg-blue-100 text-blue-800';
      case 'CANCELED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatTime = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    return `${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}-${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="bg-light-black rounded-xl shadow-sm border border-zinc-800 p-6 m-6">
        <h2 className="text-xl font-bold text-off-white mb-6">Recent Appointments</h2>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-600 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light-black rounded-xl shadow-sm border border-zinc-800 p-6 m-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-off-white">Appointment Activity</h2>
        <button className="text-sm text-primary-green hover:text-dark-green font-medium">
          View All
        </button>
      </div>
      
      {error && (
        <div className="mb-4 p-4 bg-red-500/20 border border-red-500 rounded-lg">
          <p className="text-red-400 text-sm">Error loading appointments: {error}</p>
          <p className="text-gray-400 text-xs mt-1">Showing demo data</p>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-xs font-semibold text-off-white uppercase tracking-wider">
                Patient
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-off-white uppercase tracking-wider">
                Date
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-off-white uppercase tracking-wider">
                Time
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-off-white uppercase tracking-wider">
                Status
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-off-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="border-b border-zinc-800 hover:bg-green-900">
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-semibold text-primary-green">
                        {getInitials(appointment.user?.name || 'Unknown')}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-off-white">
                        {appointment.user?.name || 'Unknown Patient'}
                      </div>
                      <div className="text-sm text-medium-gray">
                        {appointment.user?.email || 'No email'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-off-white">
                  {formatDate(appointment.slot?.startTime || appointment.createdAt)}
                </td>
                <td className="py-4 px-4 text-sm text-off-white">
                  {appointment.slot?.startTime && appointment.slot?.endTime 
                    ? formatTime(appointment.slot.startTime, appointment.slot.endTime)
                    : 'TBD'
                  }
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  {appointment.status === 'PENDING' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleStatusUpdate(appointment.id, 'CONFIRMED')}
                        className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(appointment.id, 'CANCELED')}
                        className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                  {appointment.status === 'CONFIRMED' && (
                    <button
                      onClick={() => handleStatusUpdate(appointment.id, 'COMPLETED')}
                      className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                    >
                      Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {appointments.length === 0 && !isLoading && (
        <div className="text-center py-8">
          <p className="text-gray-400">No appointments found</p>
        </div>
      )}
    </div>
  );
};

export default AppointmentActivity;
