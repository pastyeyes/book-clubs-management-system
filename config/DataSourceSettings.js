require('dotenv').config();

const DataSourceSettings = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT
}

module.exports = DataSourceSettings;
