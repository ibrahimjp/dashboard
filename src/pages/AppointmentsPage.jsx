import React, { useState } from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';

const AppointmentsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const appointments = [
    {
      id: 1,
      patient: {
        name: 'Leslie Alexander',
        email: 'lesie.alexander@example.com',
        avatar: 'LA',
        phone: '+1 (555) 123-4567'
      },
      doctor: 'Dr. Jacob Jones',
      department: 'Cardiology',
      date: '10/10/2020',
      time: '09:15-09:45am',
      status: 'confirmed',
      condition: 'Mumps Stage II'
    },
    {
      id: 2,
      patient: {
        name: 'Ronald Richards',
        email: 'ronald.richards@example.com',
        avatar: 'RR',
        phone: '+1 (555) 234-5678'
      },
      doctor: 'Dr. Theresa Webb',
      department: 'Neurology',
      date: '10/12/2020',
      time: '12:00-12:45pm',
      status: 'pending',
      condition: 'Depression'
    },
    {
      id: 3,
      patient: {
        name: 'Jane Cooper',
        email: 'jane.cooper@example.com',
        avatar: 'JC',
        phone: '+1 (555) 345-6789'
      },
      doctor: 'Dr. Jacob Jones',
      department: 'Orthopedics',
      date: '10/13/2020',
      time: '01:15-01:45pm',
      status: 'confirmed',
      condition: 'Arthritis'
    },
    {
      id: 4,
      patient: {
        name: 'Robert Fox',
        email: 'robert.fox@example.com',
        avatar: 'RF',
        phone: '+1 (555) 456-7890'
      },
      doctor: 'Dr. Theresa Webb',
      department: 'Endocrinology',
      date: '10/14/2020',
      time: '02:30-03:00pm',
      status: 'cancelled',
      condition: 'Diabetes'
    },
    {
      id: 5,
      patient: {
        name: 'Jenny Wilson',
        email: 'jenny.wilson@example.com',
        avatar: 'JW',
        phone: '+1 (555) 567-8901'
      },
      doctor: 'Dr. Arlene McCoy',
      department: 'Psychiatry',
      date: '10/15/2020',
      time: '12:00-12:45pm',
      status: 'confirmed',
      condition: 'Depression'
    }
  ];

  const getStatusBadge = (status) => {
    const variants = {
      confirmed: 'success',
      pending: 'warning',
      cancelled: 'danger'
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const filteredAppointments = selectedFilter === 'all' 
    ? appointments 
    : appointments.filter(apt => apt.status === selectedFilter);

  const stats = [
    { label: 'Total Appointments', value: appointments.length, color: 'text-blue-600' },
    { label: 'Confirmed', value: appointments.filter(apt => apt.status === 'confirmed').length, color: 'text-green-600' },
    { label: 'Pending', value: appointments.filter(apt => apt.status === 'pending').length, color: 'text-yellow-600' },
    { label: 'Cancelled', value: appointments.filter(apt => apt.status === 'cancelled').length, color: 'text-red-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="md">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export
              </Button>
              <Button variant="primary" size="md">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Appointment
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
              <Card key={index}>
                <div className="p-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Filters and Search */}
          <Card className="mb-6">
            <div className="p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                    {['all', 'confirmed', 'pending', 'cancelled'].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setSelectedFilter(filter)}
                        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          selectedFilter === filter
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search appointments..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </Card>

          {/* Appointments Table */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Appointments</h3>
              <Table>
                <Table.Head>
                  <tr>
                    <Table.Header>Patient</Table.Header>
                    <Table.Header>Doctor</Table.Header>
                    <Table.Header>Department</Table.Header>
                    <Table.Header>Date & Time</Table.Header>
                    <Table.Header>Condition</Table.Header>
                    <Table.Header>Status</Table.Header>
                    <Table.Header>Actions</Table.Header>
                  </tr>
                </Table.Head>
                <Table.Body>
                  {filteredAppointments.map((appointment) => (
                    <Table.Row key={appointment.id}>
                      <Table.Cell>
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-sm font-semibold text-blue-600">{appointment.patient.avatar}</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{appointment.patient.name}</div>
                            <div className="text-sm text-gray-500">{appointment.patient.email}</div>
                            <div className="text-xs text-gray-400">{appointment.patient.phone}</div>
                          </div>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="text-sm text-gray-900">{appointment.doctor}</div>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="text-sm text-gray-900">{appointment.department}</div>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="text-sm text-gray-900">{appointment.date}</div>
                        <div className="text-sm text-gray-500">{appointment.time}</div>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="text-sm text-gray-900">{appointment.condition}</div>
                      </Table.Cell>
                      <Table.Cell>
                        {getStatusBadge(appointment.status)}
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 p-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button className="text-red-600 hover:text-red-800 p-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AppointmentsPage;
