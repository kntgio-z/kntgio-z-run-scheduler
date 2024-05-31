const { initDB } = require("./db.config.js");
const { scheduleJob } = require("node-schedule");
const { log, err } = require("./util/console.js");
const { patterns } = require("./util/cron.js");

/**
 * Runs the scheduler to execute specified plugins at scheduled intervals.
 * @async
 * @param {Object} options - Options object.
 * @param {Object} options.db - Database configuration object.
 * @param {number} options.db.connectionLimit - Maximum number of connections.
 * @param {string} options.db.host - Hostname of the database server.
 * @param {string} options.db.user - Username for database authentication.
 * @param {string} options.db.password - Password for database authentication.
 * @param {string} options.db.database - Name of the database.
 * @param {number} options.db.port - Port number of the database server.
 * @param {Array<{interval: string|Date|Object, callback: (connection: Object) => void, enable: boolean}>} options.plugins - Array of plugin objects.
 * @param {string|Date|Object} options.plugins[].interval - Interval at which to run the plugin.
 * @param {(connection: Object) => void} options.plugins[].callback - Function to execute as the plugin.
 * @param {boolean} options.plugins[].enable - Flag to enable/disable the plugin.
 * @returns {Promise<void>} A Promise that resolves when the scheduler is set up.
 */
const runScheduler = async ({ db, plugins }) => {
  try {
    // Connect to MySQL
    const connection = await initDB(db);

    log("Connected to database.");

    // Schedule plugins implementation
    plugins.forEach(({ interval, callback, enable }) => {
      if (enable) {
        scheduleJob(interval, () => callback(connection));
      }
    });
  } catch (error) {
    err(error);
  }
};

exports.runScheduler = runScheduler;
exports.patterns = patterns;
