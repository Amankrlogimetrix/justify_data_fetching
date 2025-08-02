const Sequelize = require("sequelize");
const sequelize = require("../../utils/dbConfig.js");

const tblCourt = sequelize.define('hc_court',{
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
    h_court_id:{
        type: Sequelize.STRING,
        allowNull: true,
    },
},{
    tableName:'hc_court',
    timestamps:true
})

module.exports = tblCourt;