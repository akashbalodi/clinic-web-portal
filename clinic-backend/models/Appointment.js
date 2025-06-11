const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  department: String,
  date: String,
  time: String,
  message: String,
  status: {
    type: String,
    enum: ['New', 'Confirmed', 'Cancelled', 'Completed'],
    default: 'New'
  },
  notes: String,
  paymentStatus: {
  type: String,
  enum: ['Pending', 'Paid'],
  default: 'Pending',
},
});

module.exports = mongoose.model('Appointment', appointmentSchema);