const pool = require('../config/db');

class DB {
    static async query(sql, params) {
        try {
            const [rows] = await pool.execute(sql, params);
            return rows;
        } catch (error) {
            console.error('Database Error:', error);
            throw error;
        }
    }
}

module.exports = DB;