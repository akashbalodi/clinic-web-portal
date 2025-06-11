import React from 'react';
import AppointmentForm from '../components/AppointmentForm';
import InquiryForm from '../components/InquiryForm';

const LandingPage = () => {
  return (
    <div className="space-y-8 p-4">
      {/* Branding */}
      <section className="text-center">
        <img src="/logo.png" alt="Clinic Logo" className="mx-auto w-32" />
        <h1 className="text-3xl font-bold mt-4">Welcome to Our Clinic</h1>
        <p className="text-gray-600">Your health is our priority</p>
      </section>

      {/* Services */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Our Services</h2>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['General Medicine', 'Pediatrics', 'Dermatology', 'Orthopedics'].map(service => (
            <li key={service} className="bg-blue-100 p-3 rounded text-center font-medium">{service}</li>
          ))}
        </ul>
      </section>

      {/* Appointment Form */}
      <AppointmentForm />

      {/* Inquiry Form */}
      <InquiryForm />

      {/* Contact */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
        <p>Email: clinic@example.com</p>
        <p>Phone: +91-1234567890</p>
        <p>Address: 123 Main St, Delhi, India</p>
        <iframe
          src="https://www.google.com/maps/embed?..."
          width="100%" height="200" style={{ border: 0 }} allowFullScreen loading="lazy"
        ></iframe>
      </section>
    </div>
  );
};

export default LandingPage;