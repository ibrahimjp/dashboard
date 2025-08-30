import React from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import StatCard from '../components/ui/StatCard';

const NewPage = () => {
  const stats = [
    {
      title: 'Total Patients',
      value: '2,847',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      iconBgColor: 'bg-blue-500'
    },
    {
      title: 'Recovered',
      value: '1,234',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      iconBgColor: 'bg-green-500'
    },
    {
      title: 'Critical',
      value: '89',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
      iconBgColor: 'bg-red-500'
    }
  ];

  const appointments = [
    {
      id: 1,
      patient: { name: 'John Doe', department: 'Cardiology', avatar: 'JD' },
      doctor: 'Dr. Smith',
      date: '2024-01-15',
      status: 'confirmed'
    },
    {
      id: 2,
      patient: { name: 'Jane Smith', department: 'Neurology', avatar: 'JS' },
      doctor: 'Dr. Johnson',
      date: '2024-01-16',
      status: 'pending'
    }
  ];

  const notifications = [
    { message: 'New patient registration', time: '2 minutes ago', type: 'info' },
    { message: 'Appointment confirmed', time: '1 hour ago', type: 'success' },
    { message: 'Lab results ready', time: '3 hours ago', type: 'warning' }
  ];

  const getStatusBadge = (status) => {
    const variants = {
      confirmed: 'success',
      pending: 'warning',
      cancelled: 'danger'
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const getNotificationColor = (type) => {
    const colors = {
      info: 'bg-blue-500',
      success: 'bg-green-500',
      warning: 'bg-yellow-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-off-white">Healthcare Dashboard</h1>
        <div className="flex items-center space-x-4">
                      <button 
              className="p-2 text-medium-gray hover:text-off-white transition-colors"
              aria-label="Notifications"
            >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
            </svg>
          </button>
                        <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-green rounded-full" aria-label="User avatar"></div>
                <span className="text-sm font-medium text-off-white">User</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                iconBgColor={stat.iconBgColor}
              />
            ))}
          </div>

          {/* Chart Section */}
          <Card>
            <Card.Body>
                                <h3 className="text-lg leading-6 font-medium text-off-white mb-4">Patient Statistics</h3>
                  <div className="h-64 bg-light-black rounded-lg flex items-center justify-center">
                    <p className="text-medium-gray">Chart placeholder - Patient data visualization</p>
              </div>
            </Card.Body>
          </Card>

          {/* Table Section */}
          <Card>
            <Card.Body>
                                <h3 className="text-lg leading-6 font-medium text-off-white mb-4">Recent Appointments</h3>
              <Table>
                <Table.Head>
                  <tr>
                    <Table.Header>Patient</Table.Header>
                    <Table.Header>Doctor</Table.Header>
                    <Table.Header>Date</Table.Header>
                    <Table.Header>Status</Table.Header>
                  </tr>
                </Table.Head>
                <Table.Body>
                  {appointments.map((appointment) => (
                    <Table.Row key={appointment.id}>
                      <Table.Cell>
                        <div className="flex items-center">
                                                        <div className="w-8 h-8 bg-primary-green/20 rounded-full flex items-center justify-center mr-3">
                                <span className="text-sm font-semibold text-primary-green">{appointment.patient.avatar}</span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-off-white">{appointment.patient.name}</div>
                                <div className="text-sm text-medium-gray">{appointment.patient.department}</div>
                          </div>
                        </div>
                      </Table.Cell>
                                                <Table.Cell className="text-off-white">{appointment.doctor}</Table.Cell>
                          <Table.Cell className="text-off-white">{appointment.date}</Table.Cell>
                      <Table.Cell>{getStatusBadge(appointment.status)}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Card.Body>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <Card.Body>
                                <h3 className="text-lg leading-6 font-medium text-off-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="primary" className="w-full">New Appointment</Button>
                <Button variant="success" className="w-full">Add Patient</Button>
                <Button variant="info" className="w-full">Generate Report</Button>
              </div>
            </Card.Body>
          </Card>

          {/* Notifications */}
          <Card>
            <Card.Body>
                                <h3 className="text-lg leading-6 font-medium text-off-white mb-4">Notifications</h3>
              <div className="space-y-3">
                {notifications.map((notification, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 ${getNotificationColor(notification.type)} rounded-full mt-2`}></div>
                                            <div className="flex-1">
                          <p className="text-sm text-off-white">{notification.message}</p>
                          <p className="text-xs text-medium-gray">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewPage;
