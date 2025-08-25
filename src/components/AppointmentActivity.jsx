import React from 'react';

const AppointmentActivity = () => {
  const appointments = [
    {
      id: 1,
      name: 'Leslie Alexander',
      email: 'lesie.alexander@example.com',
      date: '10/10/2020',
      time: '09:15-09:45am',
      doctor: 'Dr. Jacob Jones',
      condition: 'Mumps Stage II',
      avatar: 'LA'
    },
    {
      id: 2,
      name: 'Ronald Richards',
      email: 'ronald.richards@example.com',
      date: '10/12/2020',
      time: '12:00-12:45pm',
      doctor: 'Dr. Theresa Webb',
      condition: 'Depression',
      avatar: 'RR'
    },
    {
      id: 3,
      name: 'Jane Cooper',
      email: 'jane.cooper@example.com',
      date: '10/13/2020',
      time: '01:15-01:45pm',
      doctor: 'Dr. Jacob Jones',
      condition: 'Arthritis',
      avatar: 'JC'
    },
    {
      id: 4,
      name: 'Robert Fox',
      email: 'robert.fox@example.com',
      date: '10/14/2020',
      time: '02:30-03:00pm',
      doctor: 'Dr. Theresa Webb',
      condition: 'Diabetes',
      avatar: 'RF'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 m-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Appointment Activity</h2>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View All
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Patient
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Time
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Doctor
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Condition
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-semibold text-blue-600">{appointment.avatar}</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-800">{appointment.name}</div>
                      <div className="text-sm text-gray-500">{appointment.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-gray-800">{appointment.date}</td>
                <td className="py-4 px-4 text-sm text-gray-800">{appointment.time}</td>
                <td className="py-4 px-4 text-sm text-gray-800">{appointment.doctor}</td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {appointment.condition}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentActivity;
