const mongoose = require('mongoose');

const memberPaymentSchema = new mongoose.Schema(
  {
    circularId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Circular',
      required: true
    },
    previousDue: {
      type: Number,
      default: 0,
      min: 0
    },
    currentDue: {
      type: Number,
      required: true,
      min: 0
    },
    advancePayment: {
      type: Number,
      default: 0,
      min: 0
    },
    currencyType: {
      type: String,
      enum: ['NPR', 'USD'],
      default: 'NPR',
      required: true
    },
    advancePaymentDate: {
      type: Date
    },
    advancePaymentReference: {
      type: String,
      trim: true
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    paidDate: {
      type: Date
    },
    paymentMethod: {
      type: String,
      enum: ['CASH', 'BANK_TRANSFER', 'ONLINE', 'OTHER'],
      default: 'CASH'
    },
    paymentReference: {
      type: String,
      trim: true
    },
    paymentYear: {
      type: Number,
      required: true
    },
    paymentMonth: {
      type: Number,
      required: true,
      min: 1,
      max: 12
    },
    remarks: {
      type: String,
      trim: true
    },
    paymentAmount:{
      type: Number,
      required: true,
      min: 0
    },
    createdBy: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    creatorType: {
      type: String,
      enum: ['USER', 'APP'],
      required: true
    },
    updatedBy: {
      type: mongoose.Schema.Types.Mixed
    },
    updaterType: {
      type: String,
      enum: ['USER', 'APP']
    }
  },
  {
    timestamps: true
  }
);

// Add indexes for faster queries
memberPaymentSchema.index({ circularId: 1 });
memberPaymentSchema.index({ paymentYear: 1, paymentMonth: 1 });
memberPaymentSchema.index({ isPaid: 1 });
memberPaymentSchema.index({ currencyType: 1 });
memberPaymentSchema.index({ creatorType: 1, createdBy: 1 });
memberPaymentSchema.index({ updaterType: 1, updatedBy: 1 });

// Method to calculate total due
memberPaymentSchema.methods.calculateTotalDue = function() {
  return (this.previousDue + this.currentDue) - this.advancePayment;
};

// Virtual for payment status
memberPaymentSchema.virtual('paymentStatus').get(function() {
  const totalDue = this.calculateTotalDue();
  if (this.isPaid) {
    return 'PAID';
  } else if (totalDue > 0) {
    return 'DUE';
  }
  return 'NO_DUE';
});

// Virtual for total due
memberPaymentSchema.virtual('totalDue').get(function() {
  return this.calculateTotalDue();
});

// Virtual for advance payment status
memberPaymentSchema.virtual('hasAdvancePayment').get(function() {
  return this.advancePayment > 0;
});

// Virtual for formatted amount with currency
memberPaymentSchema.virtual('formattedTotalDue').get(function() {
  const totalDue = this.calculateTotalDue();
  return {
    amount: totalDue,
    currency: this.currencyType,
    formatted: `${this.currencyType} ${totalDue.toFixed(2)}`
  };
});

module.exports = mongoose.model('MemberPayment', memberPaymentSchema); 