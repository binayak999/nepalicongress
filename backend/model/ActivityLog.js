const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  actorId: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  actorType: {
    type: String,
    enum: ['USER', 'APP', 'UNKNOWN'],
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: ['CREATE', 'UPDATE', 'DELETE', 'USER_LOGIN', 'USER_LOGOUT']
  },
  details: {
    method: String,
    endpoint: String,
    userInput: {
      body: mongoose.Schema.Types.Mixed,
      params: mongoose.Schema.Types.Mixed,
      query: mongoose.Schema.Types.Mixed
    },
    resourceType: String,
    resourceId: mongoose.Schema.Types.Mixed,
    actorType: String
  },
  ipAddress: String,
  userAgent: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better query performance
activityLogSchema.index({ actorId: 1, timestamp: -1 });
activityLogSchema.index({ action: 1, timestamp: -1 });
activityLogSchema.index({ 'details.resourceType': 1, timestamp: -1 });
activityLogSchema.index({ actorType: 1, timestamp: -1 });

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

module.exports = ActivityLog; 