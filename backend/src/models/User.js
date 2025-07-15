const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  vehicles: [{
    vehicleNumber: {
      type: String,
      required: true,
      uppercase: true,
      trim: true
    },
    vehicleType: {
      type: String,
      enum: ['car', 'bike', 'truck', 'bus'],
      default: 'car'
    },
    brand: String,
    model: String,
    color: String,
    isDefault: {
      type: Boolean,
      default: false
    }
  }],
  profilePicture: {
    type: String,
    default: null
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
  preferences: {
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      sms: {
        type: Boolean,
        default: true
      },
      push: {
        type: Boolean,
        default: true
      }
    },
    language: {
      type: String,
      enum: ['en', 'hi', 'ta', 'te', 'bn'],
      default: 'en'
    },
    currency: {
      type: String,
      enum: ['INR', 'USD', 'EUR'],
      default: 'INR'
    }
  },
  wallet: {
    balance: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: 'INR'
    }
  },
  fcmToken: {
    type: String,
    default: null
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  verificationExpires: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  lastLogin: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'parking_owner'],
    default: 'user'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return this.name;
});

// Index for faster queries
userSchema.index({ email: 1 });
userSchema.index({ phoneNumber: 1 });
userSchema.index({ 'vehicles.vehicleNumber': 1 });

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS) || 12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to get default vehicle
userSchema.methods.getDefaultVehicle = function() {
  return this.vehicles.find(vehicle => vehicle.isDefault) || this.vehicles[0];
};

// Method to add vehicle
userSchema.methods.addVehicle = function(vehicleData) {
  if (vehicleData.isDefault) {
    this.vehicles.forEach(vehicle => vehicle.isDefault = false);
  }
  this.vehicles.push(vehicleData);
  return this.save();
};

// Method to remove vehicle
userSchema.methods.removeVehicle = function(vehicleNumber) {
  this.vehicles = this.vehicles.filter(vehicle => vehicle.vehicleNumber !== vehicleNumber);
  return this.save();
};

// Static method to find by email or phone
userSchema.statics.findByEmailOrPhone = function(identifier) {
  return this.findOne({
    $or: [
      { email: identifier.toLowerCase() },
      { phoneNumber: identifier }
    ]
  });
};

// Method to update wallet balance
userSchema.methods.updateWalletBalance = function(amount, operation = 'add') {
  if (operation === 'add') {
    this.wallet.balance += amount;
  } else if (operation === 'subtract') {
    this.wallet.balance -= amount;
  }
  return this.save();
};

module.exports = mongoose.model('User', userSchema); 