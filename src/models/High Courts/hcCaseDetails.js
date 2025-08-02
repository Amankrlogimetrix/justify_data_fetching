const Sequelize = require("sequelize");
const sequelize = require("../../utils/dbConfig.js");


const tblCaseDetails = sequelize.define('hc_cases', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },
    case_number: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    case_type: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    case_status: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    case_description: {
        type: Sequelize.STRING(1000),
        allowNull: false,
        },
        case_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
    court_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'hc_court',
            key: 'id'
        }
    },
    case_officer_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'officer_data',
            key: 'id'
        }
    },
}, {
    tableName: 'hc_cases',
    timestamps: true
});