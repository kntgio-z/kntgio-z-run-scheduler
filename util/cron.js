const patterns = {
  min: (val) => {
    return `${val === 1 ? "*" : `*/${val}`} * * * *`; // Generate cron pattern for minutes
  },
  hr: (val) => {
    return `* ${val === 1 ? "*" : `*/${val}`} * * *`; // Generate cron pattern for hours
  },
};

exports.patterns = patterns;
