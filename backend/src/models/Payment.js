const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  method: {
    type: String,
    enum: ['card', 'upi', 'wallet', 'netbanking', 'cash', 'other'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed', 'refunded'],
    default: 'pending'
  },
  transactionId: String,
  gateway: {
    type: String,
    enum: ['stripe', 'razorpay', 'manual', 'other'],
    default: 'manual'
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  receiptUrl: String,
  notes: String
}, {
  timestamps: true
});

paymentSchema.index({ user: 1, booking: 1, method: 1 });

module.exports = mongoose.model('Payment', paymentSchema); 