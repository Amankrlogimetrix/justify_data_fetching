const express = require('express');
const router = express.Router();


const { fetchDcCaseDetailsFrom_E_court } = require('../controller/District Court Controller/dcCaseDetails');
const { fetchCasesDetailsAsPerBarCouncil, getUsersDistrictsCases } = require('../controller/Cases Controller/fetchCaseList');

router.get('/dc-case-details/:id', fetchDcCaseDetailsFrom_E_court);
router.post('/cases-barcouncil', fetchCasesDetailsAsPerBarCouncil);
router.get('/get-users-districts-cases', getUsersDistrictsCases);

module.exports = router