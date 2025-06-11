import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const fetchData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };

      const [appRes, inqRes] = await Promise.all([
        fetch(`http://localhost:5000/api/appointments`, { headers }),
        fetch(`http://localhost:5000/api/inquiries`, { headers })
      ]);

      const appData = await appRes.json();
      const inqData = await inqRes.json();

      setAppointments(appData);
      setInquiries(inqData);
    } catch (err) {
      console.error(err);
      alert('Session expired. Please login again.');
      localStorage.removeItem('token');
      navigate('/admin');
    }
  };

  useEffect(() => {
    if (!token) return navigate('/admin');
    fetchData();
  }, []);

  const handleStatusChange = async (type, id, status) => {
    try {
      const url = `http://localhost:5000/api/${type}/${id}`;
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('You have been logged out.');
    navigate('/admin');
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-200 p-4 rounded">Appointments: {appointments.length}</div>
        <div className="bg-yellow-200 p-4 rounded">Pending: {appointments.filter(a => a.status === 'New').length}</div>
        <div className="bg-green-200 p-4 rounded">Confirmed: {appointments.filter(a => a.status === 'Confirmed').length}</div>
        <div className="bg-gray-200 p-4 rounded">Inquiries: {inquiries.length}</div>
      </div>

      {/* Appointment Table */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Appointments</h2>
        <table className="w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Dept</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((app) => (
              <tr key={app._id} className="text-center">
                <td className="p-2 border">{app.name}</td>
                <td className="p-2 border">{app.department}</td>
                <td className="p-2 border">{app.date}</td>
                <td className="p-2 border">{app.status}</td>
                <td className="p-2 border">
                  {['Confirmed', 'Cancelled', 'Completed'].map(s => (
                    <button key={s} onClick={() => handleStatusChange('appointments', app._id, s)} className="text-sm bg-blue-500 text-white rounded px-2 py-1 m-1">{s}</button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Inquiry Table */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Inquiries</h2>
        <table className="w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Message</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inq) => (
              <tr key={inq._id} className="text-center">
                <td className="p-2 border">{inq.name}</td>
                <td className="p-2 border">{inq.email}</td>
                <td className="p-2 border">{inq.message}</td>
                <td className="p-2 border">{inq.status}</td>
                <td className="p-2 border">
                  {['New','Replied'].map(s => (
                    <button key={s} onClick={() => handleStatusChange('inquiries', inq._id, s)} className="text-sm bg-green-600 text-white rounded px-2 py-1 m-1">{s}</button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
