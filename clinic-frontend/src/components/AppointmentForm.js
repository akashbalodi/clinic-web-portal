import React, { useState } from 'react';

const AppointmentForm = () => {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    department: '', 
    date: '', 
    time: '', 
    message: '' 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/api/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert('Appointment booked!');
      // Reset form after successful submission
      setForm({ 
        name: '', 
        email: '', 
        phone: '', 
        department: '', 
        date: '', 
        time: '', 
        message: '' 
      });
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold">Book Appointment</h2>
      
      <input 
        placeholder="Name" 
        className="input" 
        required 
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })} 
      />
      
      <input 
        placeholder="Email" 
        type="email" 
        className="input" 
        required 
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })} 
      />
      
      <input 
        placeholder="Phone" 
        className="input" 
        required 
        value={form.phone}
        onChange={e => setForm({ ...form, phone: e.target.value })} 
      />
      
      <input 
        placeholder="Department" 
        className="input" 
        required 
        value={form.department}
        onChange={e => setForm({ ...form, department: e.target.value })} 
      />
      
      <input 
        type="date" 
        className="input" 
        required 
        value={form.date}
        onChange={e => setForm({ ...form, date: e.target.value })} 
      />
      
      <input 
        type="time" 
        className="input" 
        required 
        value={form.time}
        onChange={e => setForm({ ...form, time: e.target.value })} 
      />
      
      <textarea 
        placeholder="Message" 
        className="input" 
        value={form.message}
        onChange={e => setForm({ ...form, message: e.target.value })}
      ></textarea>
      
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default AppointmentForm;