const sequelize = require("../utils/dbConfig.js");
const Sequelize = require("sequelize");
const stateModel = require("./statesModel.js");
const districtModel = require("./districtModel");
const complexModel = require("./Districts Courts/complexModel.js");
const DcCourtModel = require("./Districts Courts/courtsModels.js");
const DcCases = require("./Districts Courts/advCaseModel.js");
const DcCaseDetails = require("./Districts Courts/caseDetails.js");
const HcCourtModel = require("./High Courts/hcCourtModel.js");
const HcBenches = require("./High Courts/benchesModel.js");
const HcCases = require("./High Courts/advCaseModel.js");
const HcCaseDetails = require("./High Courts/caseDetails.js");

stateModel.hasMany(districtModel, {
  foreignKey: 'own_state_id',
  as: 'districts'
});

districtModel.belongsTo(stateModel, {
  foreignKey: 'own_state_id',
  as: 'state'
});


DcCases.hasMany(DcCaseDetails, { foreignKey: 'adv_cases_id' });
DcCaseDetails.belongsTo(DcCases, { foreignKey: 'adv_cases_id' });



module.exports = {
    sequelize,
    Sequelize,
    stateModel,
    districtModel,
    complexModel,
    DcCourtModel,
    HcCourtModel,
    HcBenches,
    DcCases,
    DcCaseDetails,
    HcCases,
    HcCaseDetails
};
