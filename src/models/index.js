const sequelize = require("../utils/dbConfig.js");
const Sequelize = require("sequelize");
const stateModel = require("./statesModel.js");
const districtModel = require("./districtModel");
const complexModel = require("./Districts Courts/complexModel.js");
const DcCourtModel = require("./Districts Courts/courtsModels.js");
const DcCases = require("./Districts Courts/dcCasesModel.js");
const HcCourtModel = require("./High Courts/hcCourtModel.js");
const HcBenchesModel = require("./High Courts/benchesModel.js");

module.exports = {
    sequelize,
    Sequelize,
    stateModel,
    districtModel,
    complexModel,
    DcCourtModel,
    HcCourtModel,
    HcBenchesModel,
    DcCases
};
