const Sequelize = require("sequelize");
const sequelize = require("../../utils/dbConfig.js");

const tblHCbenches = sequelize.define('hc_benches',{
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
    bench_id:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    own_hc_court_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
            references: {
                model: 'hc_court',
                key: 'id'
            }
        },
},{
    tableName:'hc_benches',
    timestamps:true
})

module.exports = tblHCbenches;