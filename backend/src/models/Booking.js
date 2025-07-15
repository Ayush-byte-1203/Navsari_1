const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  parkingSpace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ParkingSpace',
    required: true
  },
  slotNumber: {
    type: Number,
    required: true
  },
  vehicleNumber: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['booked', 'active', 'completed', 'cancelled', 'expired'],
    default: 'booked'
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
    default: null
  },
  amount: {
    type: Number,
    required: true
  },
  alerts: [
    {
      type: String,
      enum: ['improper_parking', 'overstay', 'slot_change', 'other']
    }
  ],
  notificationSent: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

bookingSchema.index({ user: 1, parkingSpace: 1, slotNumber: 1, startTime: 1 });

module.exports = mongoose.model('Booking', bookingSchema); 