const ActivityLog = require("../model/ActivityLog");
const mongoose = require('mongoose');

const logger = {
  async log(actorId, action, details, req, actorType = 'USER') {
    try {
      // Validate actorId based on actorType
      if (actorType === 'USER' && !mongoose.Types.ObjectId.isValid(actorId)) {
        console.warn('Invalid user ID format:', actorId);
        return null;
      }

      const logEntry = new ActivityLog({
        actorId,
        actorType,
        action,
        details: {
          ...details,
          actorType
        },
        ipAddress: req.ip || req.connection.remoteAddress,
        userAgent: req.headers['user-agent'],
        timestamp: new Date()
      });

      await logEntry.save();
      return logEntry;
    } catch (error) {
      console.error('Logger Error:', {
        error: error.message,
        actorId,
        actorType,
        action
      });
      return null; // Return null instead of throwing to prevent middleware errors
    }
  },

  // Helper methods for common actions
  async logLogin(actorId, req, actorType = 'USER') {
    return this.log(actorId, 'USER_LOGIN', { timestamp: new Date() }, req, actorType);
  },

  async logLogout(actorId, req, actorType = 'USER') {
    return this.log(actorId, 'USER_LOGOUT', { timestamp: new Date() }, req, actorType);
  },

  async logCreate(actorId, resourceType, resourceId, details = {}, req, actorType = 'USER') {
    return this.log(actorId, 'CREATE', {
      resourceType,
      resourceId,
      ...details
    }, req, actorType);
  },

  async logUpdate(actorId, resourceType, resourceId, details = {}, req, actorType = 'USER') {
    return this.log(actorId, 'UPDATE', {
      resourceType,
      resourceId,
      ...details
    }, req, actorType);
  },

  async logDelete(actorId, resourceType, resourceId, details = {}, req, actorType = 'USER') {
    return this.log(actorId, 'DELETE', {
      resourceType,
      resourceId,
      ...details
    }, req, actorType);
  },

  async getLogs(query = {}, options = {}) {
    try {
      const { page = 1, limit = 10, sortBy = 'timestamp', sortOrder = 'desc' } = options;
      const skip = (page - 1) * limit;

      const sort = {};
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

      const [logs, total] = await Promise.all([
        ActivityLog.find(query)
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .lean(),
        ActivityLog.countDocuments(query)
      ]);

      return {
        logs,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      console.error('Error fetching logs:', error);
      throw error;
    }
  }
};

module.exports = logger; 