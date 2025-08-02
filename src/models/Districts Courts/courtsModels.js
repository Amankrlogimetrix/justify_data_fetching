const Sequelize = require("sequelize");
const sequelize = require("../../utils/dbConfig.js");

const tblCourt = sequelize.define('dc_court',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:true
    },
    name:{
        type:Sequelize.STRING(300),  
        allowNull:true
    },
    d_court_id:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    state_id: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    district_id:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    own_state_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
            references: {
                model: 'state_data',
                key: 'id'
            }
    },
    own_district_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
            references: {
                model: 'district_data',
                key: 'id'
            }
        },
    own_complex_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
            references: {
                model: 'dc_complex',
                key: 'id'
            }
    },
},{
    tableName:'dc_court',
    timestamps:true
})

module.exports = tblCourt;