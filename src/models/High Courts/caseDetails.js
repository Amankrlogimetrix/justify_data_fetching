const Sequelize = require("sequelize");
const sequelize = require("../../utils/dbConfig.js");


const tblCaseDetails = sequelize.define('hc_case_details', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },
    cnr: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    filing: {
        type: Sequelize.JSONB,
        allowNull: false,
    },
    registration: {
        type: Sequelize.JSONB,
        allowNull: false,
    },
    status: {
        type: Sequelize.JSONB,
        allowNull: false,
    },
    case_status: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    parties: {
        type: Sequelize.JSONB,
        allowNull: false,
    },
    acts: {
        type: Sequelize.JSONB,
        allowNull: true,
    },
    sub_matters:{
        type:Sequelize.JSONB,
    },
    is_details:{
        type:Sequelize.JSONB,
    },
    category_details:{
        type:Sequelize.JSONB,
    },
    document_details:{
        type:Sequelize.JSONB,
    },
    objections:{
        type:Sequelize.JSONB,
    },
    history:{
        type:Sequelize.JSONB,
    },
    orders:{
        type:Sequelize.JSONB,
    },
    adv_cases_id:{
        type:Sequelize.INTEGER,
        references:{
            model:"hc_adv_cases",
            key:'id',
            },
    },
    raw:{
        type:Sequelize.JSONB,
    }
    

}, {
    tableName: 'hc_case_details',
    timestamps: true
});

module.exports = tblCaseDetails
