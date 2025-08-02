const express = require('express');
const router = express.Router();
const { staticDataController,  } = require('../controller/District Court Controller/DcMasterInsertion');
const { highCourtsData } = require('../controller/High Court Controller/HcMasterInsertion');

router.post('/state-data', staticDataController);
router.post('/highCourtsData', highCourtsData);


module.exports = router;