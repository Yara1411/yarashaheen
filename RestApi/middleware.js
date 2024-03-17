const fs = require('fs');

const middleware = {
    requestLogger: (req, res, next) => {
        const logData = `Method: ${req.method}, URL: ${req.url}, Body: ${JSON.stringify(req.body)}\n`;
        fs.appendFile('serverLogs.log', logData, (err) => {
            if (err) console.error('Error writing to log file:', err);
        });
        next();
    }
};

module.exports = middleware;
