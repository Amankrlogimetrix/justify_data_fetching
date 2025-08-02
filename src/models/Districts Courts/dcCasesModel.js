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
        allowNull: false,
    },
    title: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    date_of_decision: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    case_number: {
        type: Sequelize.STRING(1000),
        allowNull: false,
        },
    filing_number: {
        type: Sequelize.STRING(1000),
        allowNull: false,
    },
    filing_year: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    type: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    own_district_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'district_data',
            key: 'id'
        }
    },
    district_id:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    advocate_name:{
        type: Sequelize.STRING(1000),
        allowNull: true,
    },
    raw:{
        type: Sequelize.TEXT,
        allowNull: true,
    }
}, {
    tableName: 'dc_adv_cases',
    timestamps: true
});

module.exports = tblDcCases;