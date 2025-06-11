import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });

    const data = await res.json();
    if (res.ok && data.token) {
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <form className="max-w-md mx-auto p-4 space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold">Admin Login</h2>
      <input type="email" placeholder="Email" className="input" required onChange={e => setCredentials({ ...credentials, email: e.target.value })} />
      <input type="password" placeholder="Password" className="input" required onChange={e => setCredentials({ ...credentials, password: e.target.value })} />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
};

export default AdminLogin;
