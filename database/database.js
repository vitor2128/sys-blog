const Sequelize = require('sequelize')

const connection = new Sequelize('guiapress', 'press', '142128@Kvc',{
    host: 'expressocs.ddns.net',
    port: 14212,
    dialect: 'mysql',
    timezone: "-03:00"
})

module.exports = connection