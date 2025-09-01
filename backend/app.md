/*
Copyright : Uplift Solutions
*/
const express = require("express");
const rateLimit = require("express-rate-limit");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const os = require("os");
// var xss = require('xss-clean');
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
var compression = require("compression");
var v8 = require("v8");
const morgan = require("morgan");

const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

// Import error handling utilities
const { withErrorHandling } = require("./extra/errorHandling");

// if (cluster.isMaster) {
//   console.log(`Master ${process.pid} is running`);

//   // Fork workers
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   // If a worker dies, restart it
//   cluster.on("exit", (worker, code, signal) => {
//     console.log(`Worker ${worker.process.pid} died`);
//     console.log("Restarting worker...");
//     cluster.fork();
//   });
// } else {
//   //Extends:
//   const options = {
//     definition: {
//       openapi: "3.0.1", // Specification (optional, defaults to swagger: '2.0')
//       info: {
//         title: "TVA", // Title (required)
//         version: "1.0.0", // Version (required)
//       },
//     },
//     // Path to the API docs
//     apis: ["./routes/*.js"],
//   };

  // Import Routes
  const hitcount = require("./routes/hitcount");
  const authRoute = require("./routes/auth");
  const postRoute = require("./routes/post");
  const singlepostRoute = require("./routes/singlepost");
  const pageRoute = require("./routes/page");
  const reportRoute = require("./routes/report");
  const fileUploadRoute = require("./routes/fileupload");
  const subDomainRoute = require("./routes/subdomain");
  const activeUserRoute = require("./routes/activeAuth");
  const categoryRoute = require("./routes/category");
  const votingRoute = require("./routes/voting");
  const pollRoute = require("./routes/polls");
  const forumRoute = require("./routes/forums");
  const leaderRoute = require("./routes/leaders");
  const committeeRoute = require("./routes/centralcommittee");
  const centraloffice = require("./routes/centraloffice");
  const districtcommitteeRoute = require("./routes/districtcommittee");
  const deletepostRoute = require("./routes/deletePost");
  const circularRoute = require("./routes/circular");
  const provicedistrictRoute = require("./routes/provicedistrict");
  const radioRoute = require("./routes/radio");
  const notificationRoute = require("./routes/notification");
  const socialprofileRoute = require("./routes/socialprofile");
  const generalConventionRoute = require("./routes/generalconvention");
  const qrRoute = require("./routes/qrcode");
  const signature = require("./routes/signature");
  const member = require("./routes/member");
  const dasboard = require("./routes/dashboard");
  const meeting = require("./routes/meeting");
  const payment = require("./routes/payment");
  const memberpost = require("./routes/memberpost");
  const analytics = require("./routes/analytics");

  const limit = rateLimit({
    max: 100, // max requests
    windowMs: 60 * 60 * 1000, // 1 Hour
    message: "Too many requests", // message to send
  });

  //getting the config file
  dotenv.config();

  // Set Mongoose options to avoid deprecation warnings
  mongoose.set('strictQuery', true);

  //Connect to DB
  mongoose
    .connect(process.env.MONGODBURLAWS)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log(err);
    });

  //Middleware
  app.use(express.json());
  app.use(fileUpload());
  // Configure CORS to allow all origins
  const corsOptions = {
    origin: "*",
    credentials: true,
  };
  
  app.use(cors(corsOptions));
  app.use(morgan("dev"));
  app.use(express.json({ limit: "10kb" }));
  // app.use(xss());
  // app.use(helmet());
  app.use(mongoSanitize());
  app.use(compression({ filter: shouldCompress }));
  // app.use(frameguard({
  //   action: 'allow-from',
  //   domain: 'https://api.nepalicongress.org'
  // }))

  //compression filter
  function shouldCompress(req, res) {
    if (req.headers["x-no-compression"]) {
      // don't compress responses with this request header
      return false;
    }

    // fallback to standard filter function
    return compression.filter(req, res);
  }

  //Route Middlewares
  app.use("/uploads/", express.static("uploads"));
  app.use("/medias/", express.static("medias"));
  app.use("/", hitcount);
  app.use("/api/v1/user", authRoute, limit);
  app.use("/api/v1/post", postRoute, limit);
  app.use("/api/v1/singlepost", singlepostRoute, limit);
  app.use("/api/v1/page", pageRoute, limit);
  app.use("/api/v1/report", reportRoute, limit);
  app.use("/api/v1/fileupload", fileUploadRoute, limit);
  app.use("/api/v1/subdomain", subDomainRoute, limit);
  app.use("/api/v1/activeuser", activeUserRoute, limit);
  app.use("/api/v1/category", categoryRoute, limit);
  app.use("/api/v1/voting", votingRoute);
  app.use("/api/v1/poll", pollRoute, limit);
  app.use("/api/v1/forum", forumRoute, limit);
  app.use("/api/v1/leader", leaderRoute, limit);
  app.use("/api/v1/centralcommittee", committeeRoute, limit);
  app.use("/api/v1/centraloffice", centraloffice, limit);
  app.use("/api/v1/districtcommittee", districtcommitteeRoute, limit);
  app.use("/api/v1/deletepost", deletepostRoute, limit);
  app.use("/api/v1/circular", circularRoute, limit);
  app.use("/api/v1/provicedistrict", provicedistrictRoute, limit);
  app.use("/api/v1/radio", radioRoute, limit);
  app.use("/api/v1/notification", notificationRoute, limit);
  app.use("/api/v1/socialprofile", socialprofileRoute, limit);
  app.use("/api/v1/generalconventions", generalConventionRoute, limit);
  app.use("/api/v1/qrcode", qrRoute, limit);
  app.use("/api/v1/signature", signature, limit);
  app.use("/api/v1/member", member, limit);
  app.use("/api/v1/dashboard", dasboard, limit);
  app.use("/api/v1/meeting", meeting, limit);
  app.use("/api/v1/payment", payment, limit);
  app.use("/api/v1/memberpost", memberpost, limit);
  app.use("/api/v1/analytics", analytics, limit);

  // Global error handling middleware
  app.use((err, req, res, next) => {
    console.error(`Global Error: ${err.message}`, err);
    return res.status(500).send({
      message: "An error occurred while processing your request",
      error: err.message
    });
  });

  app.listen(3000, () => console.log("Server Up and running", os.hostname()));
// }
