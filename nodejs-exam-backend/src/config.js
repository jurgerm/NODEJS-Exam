require('dotenv').config();

module.exports = {
  port: process.env.PORT || 8080,
  jwtPassword: process.env.JWT_PASSWORD,
  dbConfig: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
  },
};