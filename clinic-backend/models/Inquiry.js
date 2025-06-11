const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  status: {
    type: String,
    enum: ['New', 'Replied'],
    default: 'New'
  },
  remarks: String
});

module.exports = mongoose.model('Inquiry', inquirySchema);