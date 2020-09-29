const mysql = require('mysql');
class Database {
	constructor() {
		this.db_connect = mysql.createPool({
      connectionLimit: 100,
      host: process.env.HOST || 'localhost',
      user: process.env.USERNAME || 'root',
      password: process.env.PASSWORD || '',
      database: process.env.DATABASE || ''
    });
		this.db_connect.getConnection(function(err) {
			try {
				if (err) throw err;
			} catch (err) {
				throw err;
			}
		});
		this.connection = this.db_connect;
	}
}

module.exports = Database;
