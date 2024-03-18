const fs = require('fs').promises; // Importing fs module with promises support

const middleware = {
    requestLogger: async (req, res, next) => 
    {
        try 
        {
            const logData = `Method: ${req.method}, URL: ${req.url}, Body: ${JSON.stringify(req.body)}\n`;
            await fs.appendFile('serverLogs.log', logData);
            next();
        } 
        catch (error) 
        {
            console.error('Error writing to log file:', error);
            // You might want to handle this error appropriately, e.g., send an error response
            next(error);
        }
    }
};

module.exports = middleware;
