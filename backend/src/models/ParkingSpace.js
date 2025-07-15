const mongoose = require('mongoose');

const parkingSpaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['government', 'private'],
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: {
      type: String,
      default: 'India'
    }
  },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
  totalSlots: {
    type: Number,
    required: true
  },
  availableSlots: {
    type: Number,
    required: true
  },
  slots: [
    {
      slotNumber: Number,
      isAvailable: { type: Boolean, default: true },
      currentBooking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', default: null },
      reservedFor: { type: String, enum: ['car', 'bike', 'truck', 'bus', 'any'], default: 'any' }
    }
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  pricePerHour: {
    type: Number,
    required: true
  },
  amenities: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  images: [String],
  contactNumber: String,
  description: String
}, {
  timestamps: true
});

parkingSpaceSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('ParkingSpace', parkingSpaceSchema); 