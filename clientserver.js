const http = require('http');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const dataFilePath = 'data.json';

let submittedData = {};
fs.readFile(dataFilePath, (err, data) => 
{
    if (!err) 
    {
        submittedData = JSON.parse(data);
    }
});

app.all('/submit-data', (req, res) => 
{
    try 
    {
        const requestData = `Method: ${req.method}, URL: ${req.url}, Body: ${JSON.stringify(req.body)}\n`;
        fs.appendFile('serverLogs.log', requestData, (err) => 
        {
            if (err) console.error('Error writing to log file:', err);
        });

        if (req.method === 'GET') 
        {
            const name = submittedData.name;
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Retrieved your name: ${name}`);
        } 
        
        else if (req.method === 'POST' || req.method === 'PUT') 
        {
            submittedData = req.body;
            fs.writeFile(dataFilePath, JSON.stringify(submittedData), (err) =>
            {
                if (err) console.error('Error writing to data file:', err);
            });

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Received and stored your name: ${submittedData.name}`);
        } 
        
        else if (req.method === 'DELETE') 
        {
            submittedData = {};
            fs.writeFile(dataFilePath, '{}', (err) => 
            {
                if (err) console.error('Error clearing data file:', err);
            });

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Submitted data cleared');
        } 
        
        else
        {
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            res.end('Method Not Allowed');
        }

    } 

    catch (error) 
    {
        fs.appendFile('serverErrors.log', `Error handling request: ${error}\n`, (err) => 
        {
            if (err) console.error('Error writing to error log:', err);
        });
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
});

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => 
{
    console.log(`Server is running on port ${PORT}`);
});