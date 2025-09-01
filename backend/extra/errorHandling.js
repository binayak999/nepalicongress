/**
 * Error handling utilities for the application
 */

/**
 * Wraps an async route handler with error handling
 * @param {Function} handler - The async route handler function
 * @returns {Function} The wrapped handler with error handling
 */
const withErrorHandling = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      console.error(`API Error: ${error.message}`, error);
      res.status(500).send({ 
        message: "An error occurred while processing your request", 
        error: error.message 
      });
    }
  };
};

module.exports = {
  withErrorHandling
};