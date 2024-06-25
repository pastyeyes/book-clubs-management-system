const { Sequelize } = require('sequelize');
const DataSourceSettings = require('./DataSourceSettings');

// Configure client
const sequelize = new Sequelize(DataSourceSettings.database, DataSourceSettings.user, DataSourceSettings.password, {
    host: DataSourceSettings.host,
    dialect: DataSourceSettings.dialect,
    port: DataSourceSettings.port,
    define: {
        timestamps: false, // Disable automatic timestamps "createdAt", "updatedAt"
    }
});

module.exports =  sequelize;