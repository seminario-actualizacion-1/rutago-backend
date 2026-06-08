require("dotenv").config();

module.exports = {
  development: {
    username: process.env.USER_DB,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    port: parseInt(process.env.PORT_DB),
    dialect: "mysql",
  },
  test: {
    username: process.env.USER_DB,
    password: process.env.DB_PASSWORD,
    database: "database_test",
    host: process.env.HOST,
    port: parseInt(process.env.PORT_DB),
    dialect: "mysql",
  },
  production: {
    // Exactamente igual que en local, para que no tenga que adivinar nada
    username: process.env.USER_DB,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    port: parseInt(process.env.PORT_DB),
    dialect: "mysql",
  },
};
