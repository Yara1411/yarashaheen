const http = require('http');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const dataFilePath = 'data.json'; // Path to your data file
let submittedData = {};

// Read data from file on server start
fs.readFile(dataFilePath, (err, data) => 
{
    if (!err) 
    {
        submittedData = JSON.parse(data);
    }
});

// Middleware to log every request
app.use((req, res, next) => 
{
    const logData = `Method: ${req.method}, URL: ${req.url}, Body: ${JSON.stringify(req.body)}\n`;
    fs.appendFile('serverLogs.log', logData, (err) => 
    {
        if (err) console.error('Error writing to log file:', err);
    });
    next();
});

app.get('/get-data', (req, res) => 
{
    try 
    {
        const name = submittedData.name;
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(`Retrieved your name: ${name}`);
    }

    catch (error) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
    }
});

app.post('/submit-data', (req, res) => 
{
    try 
    {
        const name = req.body.name;
        submittedData = req.body;
        fs.writeFile(dataFilePath, JSON.stringify(submittedData), (err) => 
        {
            if (err) console.error('Error writing to data file:', err);
        });

        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(`Received and stored your name: ${name}`);
    } 
    catch (error) 
    {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
    }
});

app.put('/update-data', (req, res) => 
{
    try 
    {
        // Log request data
        const requestData = `Method: ${req.method}, URL: ${req.url}, Body: ${JSON.stringify(req.body)}\n`;

        // Update submittedData with the new data received
        submittedData = req.body;

        // Write the request data and the updated data to the file
        fs.appendFile('serverLogs.log', requestData, (err) => 
        {
            if (err) console.error('Error writing to log file:', err);
        });

        fs.writeFile(dataFilePath, JSON.stringify(submittedData), (err) => 
        {
            if (err) console.error('Error updating data file:', err);
        });

        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('PUT request received and data updated');
    } 
    catch (error) 
    {
        // Log the error
        fs.appendFile('serverErrors.log', `Error handling request: ${error}\n`, (err) => 
        {
            if (err) console.error('Error writing to error log:', err);
        });

        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
    }
});


app.delete('/delete-data', (req, res) => 
{
    try
    {
        submittedData = {};
        fs.writeFile(dataFilePath, '{}', (err) => 
        {
            if (err) console.error('Error clearing data file:', err);
        });
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Submitted data cleared');
    } 
    catch (error) 
    {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
    }
}); 

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



// Here's the typical flow of execution:

// 1)The Express application is configured with middleware functions and route handlers.
// 2)When a request is made to the server, it first passes through any middleware functions defined
// using app.use() or specific to the requested route.
// Middleware functions can perform tasks such as logging, parsing request bodies, 
// authenticating users, etc. 
// They have access to the request (req) and response (res) objects and can optionally call 
// the next() function to pass control to the next middleware function in the stack.
// 3)If next() is called, the request proceeds to the next middleware function. 
// If next() is not called (for example, if the middleware sends a response back to the client),
// the remaining middleware functions are skipped, and the request processing ends.
// 4)Once the request passes through all middleware functions, it reaches the route handler 
// associated with the requested route. The route handler is responsible for handling the request 
// and generating an appropriate response.
// 5)After the route handler completes its tasks, it sends a response back to the client.

// So, to answer your question, yes, each time a method is requested, it first passes through any 
// applicable middleware functions defined using app.use() or specific to the requested route before 
// reaching the route handler associated with that route.





