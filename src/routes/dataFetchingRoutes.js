const express = require('express');
const router = express.Router();


const { fetchCasesDetailsAsPerBarCouncil, fetchHighCourtsData } = require('../controller/Cases Controller/fetchCaseList');
const { staticDataController } = require('../controller/District Court Controller/DcMasterInsertion');
const { highCourtsData } = require('../controller/High Court Controller/HcMasterInsertion');


// router.post('/state-data', staticDataController);
// router.post('/highCourtsData', highCourtsData);
router.post('/cases-barcouncil', fetchCasesDetailsAsPerBarCouncil);
router.post("/cases-highcourt",fetchHighCourtsData)



module.exports = router