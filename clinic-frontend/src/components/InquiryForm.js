import React, { useState } from 'react';

const InquiryForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/api/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert('Inquiry submitted!');
      setForm({ name: '', email: '', message: '' }); // Reset form fields
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold">General Inquiry</h2>
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
      <textarea 
        placeholder="Message" 
        className="input" 
        required 
        value={form.message}
        onChange={e => setForm({ ...form, message: e.target.value })}
      ></textarea>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Send</button>
    </form>
  );
};

export default InquiryForm;