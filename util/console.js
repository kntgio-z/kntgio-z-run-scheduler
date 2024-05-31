const log = (msg, label = "scheduler") => {
  console.log(`\x1b[35m[${label}] ${msg}\x1b[0m`);
};

const err = (error, label = "scheduler") => {
  console.error(`\x1b[31m[${label}] Error: ${error} \x1b[0m`);
};

exports.log = log;
exports.err = err;
