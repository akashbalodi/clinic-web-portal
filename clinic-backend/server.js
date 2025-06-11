const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const appointmentRoute = require('./routes/appointmentRoutes');
const inquiryRoute = require('./routes/inquiryRoutes');
const adminRoute = require('./routes/adminRoute');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/appointments', appointmentRoute);
app.use('/api/inquiries', inquiryRoute);
app.use('/api/admin', adminRoute);


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log('Server running on port 5000');
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
