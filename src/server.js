const express = require("express");
const routers = require("./routes");
const {sequelize } = require("./models/index");
const https = require('https');
const http = require('http');
const cookieParser = require('cookie-parser');
require("dotenv").config()
const cors = require("cors")
const multer = require('multer');

const app = express()

app.use((req, res, next) => {
  console.log(`🛎️ Incoming request Server: ${req.method} ${req.originalUrl}`);
  next();
});

// app.use((req, res, next) => {
//   if (req.url.startsWith('/api')) {
//     req.url = req.url.replace('/api', '');
//   }
//   next();
// });

// const allowedIps = ['10.128.188.163']; // Only allow this IP

// Middleware to check IP
// app.use((req, res, next) => {
//   const clientIp = req.ip; // Get the IP address of the client

//   console.log("Client IP:", clientIp); // Debugging log to see the client's IP

// //   if (allowedIps.includes(clientIp)) {
// //     next(); // Allow the request if the IP is in the allowed list
// //   } else {
// //     res.status(403).json({ message: 'Forbidden: IP not allowed' }); 
// //   }
// });

// app.use((req, res, next) => {
//   console.log(`Endpoint Hit: ${req.method} ${req.originalUrl}`);
//   console.log('Query Parameters:', req.query);
//   console.log('Request Body:', req.body);
//   next(); // Continue to the next middleware or route handler
// });
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(cookieParser());
app.use(multer().any());
app.use("/",routers)

const httpsOptions = {
    // key: fs.readFileSync('/etc/letsencrypt/live/edusaroj.com/privkey.pem'),
    // cert: fs.readFileSync('/etc/letsencrypt/live/edusaroj.com/cert.pem'),
 };
  
  
  const httpsServer = https.createServer(httpsOptions, app);
  const httpServer = http.createServer(app);
  
  // httpsServer.listen(process.env.HTTPS_PORT, () => {
  //   console.log('HTTPS server is running on port', process.env.HTTPS_PORT);
  // });
  
  httpServer.listen(process.env.HTTP_PORT, () => {
    console.log('HTTP server is running on port ', process.env.HTTP_PORT);
  });



sequelize
  // // // //.sync({ alter: true })
  .sync({alter:true}) // Use force: true to drop and recreate tables
  .then(() => {
    console.log('Sequelize models synced with the database');
  })
  .catch((err) => console.log("error from Sequelize synced:", err));