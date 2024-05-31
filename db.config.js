const mysql = require("mysql2/promise");

/**
 * Initializes a MySQL database connection.
 * @async
 * @param {Object} config - Database configuration object.
 * @param {number} config.connectionLimit - Maximum number of connections.
 * @param {string} config.host - Hostname of the database server.
 * @param {string} config.user - Username for database authentication.
 * @param {string} config.password - Password for database authentication.
 * @param {string} config.database - Name of the database.
 * @param {number} config.port - Port number of the database server.
 * @returns {Promise<Connection>} A Promise that resolves to a MySQL connection.
 * @throws {Error} Throws an error if there's a problem connecting to the database.
 */
const initDB = async ({
  connectionLimit,
  host,
  user,
  password,
  database,
  port,
}) => {
  try {
    return await mysql.createConnection({
      connectionLimit,
      host,
      user,
      password,
      database,
      port,
    });
  } catch (error) {
    if (error.code === "ENOTFOUND")
      throw new Error(
        "There is a problem in connecting to the database. Please try again."
      );
    throw new Error("Internal server error. " + error.message);
  }
};

exports.initDB = initDB;
