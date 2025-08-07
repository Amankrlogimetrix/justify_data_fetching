const Sequelize = require("sequelize");
const sequelize = require("../../utils/dbConfig.js");


const tblDcCases = sequelize.define('dc_adv_cases', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },
    cnr: {
        type: Sequelize.STRING(100),
    },
    title: {
        type: Sequelize.STRING(100),
    },
    date_of_decision: {
        type: Sequelize.STRING(100),
    },
    case_number: {
        type: Sequelize.STRING(1000),
        },
    filing_number: {
        type: Sequelize.STRING(1000),
    },
    filing_year: {
        type: Sequelize.STRING,
    },
    type: {
        type: Sequelize.STRING(100),
    },
    own_district_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'district_data',
            key: 'id'
        }
    },
    district_id:{
        type: Sequelize.STRING,
    },
    advocate_name:{
        type: Sequelize.STRING(1000),
    },
    adv_id:{
        type: Sequelize.INTEGER,
        //   references: {
        //     model: 'lawyers',
        //     key: 'id'
        // }
    },
    raw:{
        type: Sequelize.TEXT,
    }
}, {
    tableName: 'dc_adv_cases',
    timestamps: true
});

module.exports = tblDcCases;