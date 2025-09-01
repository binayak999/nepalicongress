const logger = require("../utils/logger");

// Store last logged actions
const lastLoggedActions = new Map();

const activityMiddleware = async (req, res, next) => {
  // Only log POST, PUT, PATCH, and DELETE requests
  if (req.method === 'GET') {
    return next();
  }

  // Store original methods
  const originalJson = res.json;
  const originalSend = res.send;
  const originalEnd = res.end;

  // Function to check for duplicate action
  const isDuplicateAction = (actorId, action, resourceType, resourceId) => {
    const key = `${actorId}-${action}-${resourceType}-${resourceId}`;
    const lastLog = lastLoggedActions.get(key);
    const now = new Date();
    
    if (lastLog) {
      const timeDiff = now - lastLog;
      // If less than 5 seconds has passed, consider it a duplicate
      if (timeDiff < 5000) {
        return true;
      }
    }
    
    // Update the last logged time
    lastLoggedActions.set(key, now);
    return false;
  };

  // Function to get actor information
  const getActorInfo = (req) => {
    if (req.user) {
      return {
        actorId: req.user._id,
        actorType: 'USER'
      };
    } else if (req.appCredentials) {
      return {
        actorId: req.appCredentials.appId,
        actorType: 'APP'
      };
    }
    return {
      actorId: null,
      actorType: 'UNKNOWN'
    };
  };

  // Override res.json method
  res.json = async function (data) {
    try {
      // Call the original res.json method
      originalJson.call(this, data);

      const { actorId, actorType } = getActorInfo(req);

      // Determine action type based on HTTP method
      let action = 'CREATE';
      if (req.method === 'PUT' || req.method === 'PATCH') action = 'UPDATE';
      else if (req.method === 'DELETE') action = 'DELETE';

      // Extract resource type from URL
      const resourceType = req.originalUrl.split('/')[3] || 'unknown';
      
      // Extract resource ID if present
      const resourceId = req.params.id || req.body._id || null;

      // Check for duplicate action
      if (isDuplicateAction(actorId, action, resourceType, resourceId)) {
        return;
      }

      // Prepare log details with user input
      const details = {
        method: req.method,
        endpoint: req.originalUrl,
        userInput: {
          body: req.body,
          params: req.params,
          query: req.query
        },
        resourceType,
        resourceId,
        actorType
      };

      // Log the activity
      try {
        await logger.log(actorId, action, details, req, actorType);
      } catch (logError) {
        console.error('Activity Middleware: Error saving log:', {
          error: logError.message,
          logData: {
            actorId,
            actorType,
            action,
            resourceType,
            resourceId
          }
        });
      }
    } catch (error) {
      console.error('Activity Middleware: General error:', error);
    }
  };

  // Override res.send method
  res.send = async function (data) {
    try {
      // Call the original res.send method
      originalSend.call(this, data);

      const { actorId, actorType } = getActorInfo(req);

      // Determine action type based on HTTP method
      let action = 'CREATE';
      if (req.method === 'PUT' || req.method === 'PATCH') action = 'UPDATE';
      else if (req.method === 'DELETE') action = 'DELETE';

      // Extract resource type from URL
      const resourceType = req.originalUrl.split('/')[3] || 'unknown';
      
      // Extract resource ID if present
      const resourceId = req.params.id || req.body._id || null;

      // Check for duplicate action
      if (isDuplicateAction(actorId, action, resourceType, resourceId)) {
        return;
      }

      // Prepare log details with user input
      const details = {
        method: req.method,
        endpoint: req.originalUrl,
        userInput: {
          body: req.body,
          params: req.params,
          query: req.query
        },
        resourceType,
        resourceId,
        actorType
      };

      // Log the activity
      await logger.log(actorId, action, details, req, actorType);
    } catch (error) {
      console.error('Activity Middleware: Error in send override:', error);
    }
  };

  // Override res.end method
  res.end = async function (data) {
    try {
      // Call the original res.end method
      originalEnd.call(this, data);

      const { actorId, actorType } = getActorInfo(req);

      // Determine action type based on HTTP method
      let action = 'CREATE';
      if (req.method === 'PUT' || req.method === 'PATCH') action = 'UPDATE';
      else if (req.method === 'DELETE') action = 'DELETE';

      // Extract resource type from URL
      const resourceType = req.originalUrl.split('/')[3] || 'unknown';
      
      // Extract resource ID if present
      const resourceId = req.params.id || req.body._id || null;

      // Check for duplicate action
      if (isDuplicateAction(actorId, action, resourceType, resourceId)) {
        return;
      }

      // Prepare log details with user input
      const details = {
        method: req.method,
        endpoint: req.originalUrl,
        userInput: {
          body: req.body,
          params: req.params,
          query: req.query
        },
        resourceType,
        resourceId,
        actorType
      };

      // Log the activity
      await logger.log(actorId, action, details, req, actorType);
    } catch (error) {
      console.error('Activity Middleware: Error in end override:', error);
    }
  };

  next();
};

module.exports = activityMiddleware;