const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const AppCredentials = require('../model/AppCredentials');

// Middleware to verify app credentials
const verifyAppCredentials = async (req, res, next) => {
  try {
    const { appId, appSecret } = req.body;
    if (!appId || !appSecret) {
      return res.status(400).send({ message: 'App ID and App Secret are required', results: {} });
    }

    const credentials = await AppCredentials.findOne({ appId, appSecret, status: true });
    if (!credentials) {
      return res.status(401).send({ message: 'Invalid credentials', results: {} });
    }

    req.credentials = credentials;
    next();
  } catch (error) {
    res.status(500).send({ message: 'Server error', results: { error: error.message } });
  }
};

// Generate token
router.post('/generate-token', verifyAppCredentials, async (req, res) => {
  try {
    const { credentials } = req;
    const { expiresIn = '24h' } = req.body; // Default expiry of 24 hours

    // Create JWT payload
    const payload = {
      appId: credentials.appId,
      name: credentials.name,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60) // 30 days from now
    };

    // Generate JWT token
    const token = jwt.sign(
      payload,
      process.env.TOKEN_SECRET || 'your-secret-key', // Use environment variable in production
      { algorithm: 'HS256' }
    );
    
    // Calculate token expiry
    const tokenExpiresAt = new Date();
    tokenExpiresAt.setDate(tokenExpiresAt.getDate() + 30); // 30 days from now

    // Update credentials with new token
    credentials.token = token;
    credentials.tokenExpiresAt = tokenExpiresAt;
    credentials.tokenStatus = true;
    credentials.lastUsed = new Date();
    await credentials.save();

    return res.status(200).send({
      message: 'Token generated successfully',
      results: {
        token,
        expiresAt: tokenExpiresAt,
        appId: credentials.appId,
        name: credentials.name
      }
    });
  } catch (error) {
    return res.status(500).send({ message: 'Error generating token', results: { error: error.message } });
  }
});

// Verify token
router.post('/verify-token', async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).send({ message: 'Token is required', results: {} });
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

    return res.status(200).send({
      message: 'Token is valid',
      results: {
        valid: true,
        appId: credentials.appId,
        name: credentials.name,
        expiresAt: credentials.tokenExpiresAt
      }
    });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).send({ message: 'Invalid token', results: {} });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).send({ message: 'Token has expired', results: {} });
    }
    return res.status(500).send({ message: 'Error verifying token', results: { error: error.message } });
  }
});

// Expire token
router.post('/expire-token', verifyAppCredentials, async (req, res) => {
  try {
    const { credentials } = req;
    
    credentials.token = null;
    credentials.tokenExpiresAt = null;
    credentials.tokenStatus = false;
    await credentials.save();

    return res.status(200).send({ message: 'Token expired successfully', results: {} });
  } catch (error) {
    return res.status(500).send({ message: 'Error expiring token', results: { error: error.message } });
  }
});

// Create new app credentials
router.post('/create', async (req, res) => {
  try {
    const { name, description, createdBy } = req.body;

    // Generate app ID and secret
    const appId = crypto.randomBytes(16).toString('hex');
    const appSecret = crypto.randomBytes(32).toString('hex');

    const credentials = new AppCredentials({
      appId,
      appSecret,
      name,
      description,
      createdBy
    });

    await credentials.save();

    return res.status(201).send({
      message: 'App credentials created successfully',
      results: {
        appId,
        appSecret,
        name,
        description
      }
    });
  } catch (error) {
    return res.status(500).send({ message: 'Error creating credentials', results: { error: error.message } });
  }
});

module.exports = router; 