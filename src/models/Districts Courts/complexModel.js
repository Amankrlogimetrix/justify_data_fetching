const Sequelize = require("sequelize");
const sequelize = require("../../utils/dbConfig.js");

const tblComplex = sequelize.define('dc_complex',{
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
    complex_id:{
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
},{
    tableName:'dc_complex',
    timestamps:true
})

module.exports = tblComplex;