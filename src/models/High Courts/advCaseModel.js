
const Sequelize = require("sequelize");
const sequelize = require("../../utils/dbConfig");

const tblHcAdvCases = sequelize.define('hc_adv_cases', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cnr: {
        type: Sequelize.STRING
    },
    case_number: {
        type: Sequelize.STRING
    },
    title:{
        type: Sequelize.STRING
    },
    type:{
        type: Sequelize.STRING
    },
    date_of_decision:{
        type: Sequelize.STRING
    },
    bench_id:{
        type: Sequelize.STRING
    },
    own_bench_id:{
        type: Sequelize.INTEGER,
        references:{
            model:"hc_benches",
            key:'id'
        }
    },
    adv_id:{
        type: Sequelize.INTEGER,
        //   references: {
        //     model: 'lawyers',
        //     key: 'id'
        // }
    },
    raw:{
        type: Sequelize.TEXT
    }
},{
    tableName: 'hc_adv_cases',
    timestamps: true
})

module.exports = tblHcAdvCases;