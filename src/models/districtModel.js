const Sequelize = require("sequelize");
const sequelize = require("../utils/dbConfig.js");

const tblDistrict = sequelize.define('district_data',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:true
    },
    name:{
        type:Sequelize.STRING,  
        allowNull:true
    },
    district_id:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    state_id: {
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
},{
    tableName:'district_data',
    timestamps:true
})

module.exports = tblDistrict;