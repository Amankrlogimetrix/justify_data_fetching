const express = require('express');
const router = express.Router();


const { fetchCasesDetailsAsPerBarCouncil, fetchHighCourtsData } = require('../controller/Cases Controller/fetchCaseList');
const { staticDataController } = require('../controller/District Court Controller/DcMasterInsertion');
const { highCourtsData } = require('../controller/High Court Controller/HcMasterInsertion');
const { fetchFromDynamicUrl } = require('../controller/Cases Controller/getFileData');


// router.post('/state-data', staticDataController);
// router.post('/highCourtsData', highCourtsData);
router.post('/cases-barcouncil', fetchCasesDetailsAsPerBarCouncil);
router.post("/cases-highcourt",fetchHighCourtsData)
router.post("/file-data",fetchFromDynamicUrl);

module.exports = router