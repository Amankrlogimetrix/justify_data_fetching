const Sequelize = require("sequelize");
const sequelize = require("../utils/dbConfig.js");

const tblState = sequelize.define('state_data',{
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
    state_id: {
        type: Sequelize.STRING,
        allowNull: true,
    },
},{
    tableName:'state_data',
    timestamps:true
})

module.exports = tblState;