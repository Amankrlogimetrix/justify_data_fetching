const express = require('express');
const router = express.Router();


const { fetchDcCaseDetailsFrom_E_court } = require('../controller/District Court Controller/dcCaseDetails');
const { fetchCasesDetailsAsPerBarCouncil } = require('../controller/Cases Controller/fetchCaseList');
const { staticDataController } = require('../controller/District Court Controller/DcMasterInsertion');
const { highCourtsData } = require('../controller/High Court Controller/HcMasterInsertion');


router.post('/state-data', staticDataController);
router.post('/highCourtsData', highCourtsData);
router.post('/cases-barcouncil', fetchCasesDetailsAsPerBarCouncil);


// router.get('/dc-case-details/:id', fetchDcCaseDetailsFrom_E_court);

module.exports = router