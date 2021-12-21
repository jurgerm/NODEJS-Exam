const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

module.exports = {
  connectToDb: async (query) => {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(query);
    await con.end();

    return data;
  },
};
