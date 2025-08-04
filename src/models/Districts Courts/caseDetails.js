const Sequelize = require("sequelize");
const sequelize = require("../../utils/dbConfig.js");

 const CaseDetails = sequelize.define('case_details', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    cnr: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    title: {
      type: Sequelize.STRING,
    },
    actsAndSections: {
      type: Sequelize.JSONB, 
    },
    details: {
      type: Sequelize.JSONB, 
    },
    firstInformationReport: {
      type: Sequelize.JSONB, 
    },
    history: {
      type: Sequelize.JSONB, 
    },
    orders: {
      type: Sequelize.JSONB, 
    },
    parties: {
      type: Sequelize.JSONB, 
    },
    status: {
      type: Sequelize.JSONB,  
    },
    case_status: {
      type: Sequelize.STRING, 
    },
    adv_cases_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
          references: {
                model: 'dc_adv_cases',
                key: 'id'
            }
    },
    raw: {
      type: Sequelize.JSONB,
    },
  }, {
    tableName: 'case_details',
    timestamps: true,
  });

  module.exports = CaseDetails