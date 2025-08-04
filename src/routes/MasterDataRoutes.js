const express = require('express');
const router = express.Router();
const { getStateAndTheirDistricts,  } = require('../controller/District Court Controller/DcMasterInsertion');
const { getUsersDistrictsCases, getDistrictsCases } = require('../controller/Cases Controller/getCasesDetails');

router.get("/get-state-district",getStateAndTheirDistricts);
router.get('/get-districts-cases', getUsersDistrictsCases);
router.get("/get-districts-cases/:id",getDistrictsCases);



module.exports = router;