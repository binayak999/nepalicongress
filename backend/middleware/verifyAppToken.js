const jwt = require('jsonwebtoken');
const AppCredentials = require('../model/AppCredentials');

const verifyAppToken = async (req, res, next) => {
  try {
    // Get the Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).send({ message: 'Authorization header is required', results: {} });
    }

    // Check if it's a Bearer token
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).send({ message: 'Invalid authorization format. Bearer token required', results: {} });
    }

    // Extract the token
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).send({ message: 'Token is required', results: {} });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET || 'your-secret-key');

    const credentials = await AppCredentials.findOne({ 
      appId: decoded.appId,
      token,
      tokenStatus: true,
      tokenExpiresAt: { $gt: new Date() }
    });

    if (!credentials) {
      return res.status(401).send({ message: 'Invalid or expired token', results: {} });
    }

    // Add credentials and decoded token to request
    req.appCredentials = credentials;
    req.tokenData = decoded;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).send({ message: 'Invalid token', results: {} });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).send({ message: 'Token has expired', results: {} });
    }
    return res.status(500).send({ message: 'Error verifying token', results: { error: error.message } });
  }
};

module.exports = verifyAppToken; 