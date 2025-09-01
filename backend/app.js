/*
 * Copyright : Uplift Solutions
 * API Server for Nepali Congress Application
 */

// Core dependencies
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const os = require("os");

// Middleware dependencies
const rateLimit = require("express-rate-limit");
const fileUpload = require("express-fileupload");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const morgan = require("morgan");
const logger = require("./utils/logger");
const activityMiddleware = require("./middleware/activityMiddleware");
const verifyToken = require("./extra/verifyToken");

// Initialize express app
const app = express();

// Make logger available globally
global.logger = logger;

// ===== CONFIGURATION =====

// Load environment variables
dotenv.config();

// Configure MongoDB
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGODBURLAWS)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

// Configure rate limiting
const apiLimiter = rateLimit({
  max: 100,               // Max 100 requests per window
  windowMs: 60 * 60 * 1000, // 1 hour window
  message: "Too many requests from this IP, please try again after an hour"
});

// ===== MIDDLEWARE =====

// Core middleware
app.use(express.json({ limit: "10kb" }));
app.use(fileUpload());
app.use(mongoSanitize());
app.use(compression({ filter: shouldCompress }));
app.use(morgan("dev"));

// CORS configuration
const corsOptions = {
  origin: "*",
  credentials: true
};
app.use(cors(corsOptions));

// Compression filter function
function shouldCompress(req, res) {
  if (req.headers["x-no-compression"]) {
    return false;
  }
  return compression.filter(req, res);
}

// ===== ROUTES =====

// Static file routes
app.use("/uploads/", express.static("uploads"));
app.use("/medias/", express.static("medias"));

// Apply token verification and activity logging to all API routes

app.use("/api/v1", activityMiddleware);

// API Routes
app.use("/", require("./routes/hitcount"));
app.use("/api/v1/user", require("./routes/auth"), apiLimiter);
app.use("/api/v1/post", require("./routes/post"), apiLimiter);
app.use("/api/v1/singlepost", require("./routes/singlepost"), apiLimiter);
app.use("/api/v1/page", require("./routes/page"), apiLimiter);
app.use("/api/v1/report", require("./routes/report"), apiLimiter);
app.use("/api/v1/fileupload", require("./routes/fileupload"), apiLimiter);
app.use("/api/v1/subdomain", require("./routes/subdomain"), apiLimiter);
app.use("/api/v1/activeuser", require("./routes/activeAuth"), apiLimiter);
app.use("/api/v1/category", require("./routes/category"), apiLimiter);
app.use("/api/v1/voting", require("./routes/voting"));
app.use("/api/v1/poll", require("./routes/polls"), apiLimiter);
app.use("/api/v1/forum", require("./routes/forums"), apiLimiter);
app.use("/api/v1/leader", require("./routes/leaders"), apiLimiter);
app.use("/api/v1/centralcommittee", require("./routes/centralcommittee"), apiLimiter);
app.use("/api/v1/centraloffice", require("./routes/centraloffice"), apiLimiter);
app.use("/api/v1/districtcommittee", require("./routes/districtcommittee"), apiLimiter);
app.use("/api/v1/deletepost", require("./routes/deletePost"), apiLimiter);
app.use("/api/v1/circular", require("./routes/circular"), apiLimiter);
app.use("/api/v1/provicedistrict", require("./routes/provicedistrict"), apiLimiter);
app.use("/api/v1/radio", require("./routes/radio"), apiLimiter);
app.use("/api/v1/notification", require("./routes/notification"), apiLimiter);
app.use("/api/v1/socialprofile", require("./routes/socialprofile"), apiLimiter);
app.use("/api/v1/generalconventions", require("./routes/generalconvention"), apiLimiter);
app.use("/api/v1/qrcode", require("./routes/qrcode"), apiLimiter);
app.use("/api/v1/signature", require("./routes/signature"), apiLimiter);
app.use("/api/v1/member", require("./routes/member"), apiLimiter);
app.use("/api/v1/dashboard", require("./routes/dashboard"), apiLimiter);
app.use("/api/v1/meeting", require("./routes/meeting"), apiLimiter);
app.use("/api/v1/payment", require("./routes/payment"), apiLimiter);
app.use("/api/v1/memberpost", require("./routes/memberpost"), apiLimiter);
app.use("/api/v1/analytics", require("./routes/analytics"), apiLimiter);
app.use("/api/v1/app-credentials", require("./routes/appCredentials"), apiLimiter);
app.use("/api/v1/member-payment", require("./routes/memberPayment"), apiLimiter);

// ===== ERROR HANDLING =====

// Global error handler
app.use((err, req, res, next) => {
  console.error(`Global Error: ${err.message}`, err);
  return res.status(500).send({
    message: "An error occurred while processing your request",
    error: err.message,
  });
});

// ===== SERVER INITIALIZATION =====

// Start the server
app.listen(3013, () => {
  console.log(`Server running on port 3000 | Host: ${os.hostname()}`);
});
