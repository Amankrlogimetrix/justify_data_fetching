const sequelize = require("../utils/dbConfig.js");
const Sequelize = require("sequelize");
const stateModel = require("./statesModel.js");
const districtModel = require("./districtModel");
const complexModel = require("./Districts Courts/complexModel.js");
const DcCourtModel = require("./Districts Courts/courtsModels.js");
const DcCases = require("./Districts Courts/advCaseModel.js");
const HcCourtModel = require("./High Courts/hcCourtModel.js");
const HcBenchesModel = require("./High Courts/benchesModel.js");
const CaseDetails = require("./Districts Courts/caseDetails.js");

stateModel.hasMany(districtModel, {
  foreignKey: 'own_state_id',
  as: 'districts'
});

districtModel.belongsTo(stateModel, {
  foreignKey: 'own_state_id',
  as: 'state'
});


DcCases.hasMany(CaseDetails, { foreignKey: 'adv_cases_id' });
CaseDetails.belongsTo(DcCases, { foreignKey: 'adv_cases_id' });



module.exports = {
    sequelize,
    Sequelize,
    stateModel,
    districtModel,
    complexModel,
    DcCourtModel,
    HcCourtModel,
    HcBenchesModel,
    DcCases,
    CaseDetails
};
