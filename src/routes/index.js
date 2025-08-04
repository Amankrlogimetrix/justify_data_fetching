const express = require('express');
const router = express.Router();

// Import all route modules
const applicationDataRoutes = require('./MasterDataRoutes');
const dataFetchingRoutes = require('./dataFetchingRoutes');

// Use the routes
router.use('/fetch', dataFetchingRoutes); // this prefixes /fetch to all data fetching routes
router.use('/api', applicationDataRoutes); // this prefixes /api to all staticData routes

router.use((req, res, next) => {
  console.log(`🛎️ Incoming request controller: ${req.method} ${req.originalUrl}`);
  next();
});
// router.get('/ping', (req, res) => {
//   console.log("✅ /api/ping hit");
//   res.send("pong");
// });

module.exports = router;
