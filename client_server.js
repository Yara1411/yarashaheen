const http = require('http');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Define the file path where data will be stored
const dataFilePath = 'data.json';

// Read data from the file when the server starts
let submittedData = {};
fs.readFile(dataFilePath, (err, data) => {
    if (!err) {
        submittedData = JSON.parse(data);
    }
});

// Define route for handling requests to '/submit-data'
app.all('/submit-data', (req, res) => {
    try {
        const requestData = `Method: ${req.method}, URL: ${req.url}, Body: ${JSON.stringify(req.body)}\n`;
        fs.appendFile('serverLogs.log', requestData, (err) => {
            if (err) console.error('Error writing to log file:', err);
        });

        if (req.method === 'GET') {
            const name = submittedData.name;
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Retrieved your name: ${name}`);
        } else if (req.method === 'POST' || req.method === 'PUT') {
            // Handle POST and PUT requests: Update the data and write to file
            submittedData = req.body;
            fs.writeFile(dataFilePath, JSON.stringify(submittedData), (err) => {
                if (err) console.error('Error writing to data file:', err);
            });
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Received and stored your name: ${submittedData.name}`);
        } else if (req.method === 'DELETE') {
            submittedData = {};
            fs.writeFile(dataFilePath, '{}', (err) => {
                if (err) console.error('Error clearing data file:', err);
            });
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Submitted data cleared');
        } else {
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            res.end('Method Not Allowed');
        }
    } catch (error) {
        fs.appendFile('serverErrors.log', `Error handling request: ${error}\n`, (err) => {
            if (err) console.error('Error writing to error log:', err);
        });
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
});

// Create server
const server = http.createServer(app);

// Listen on port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// const http = require('http');
// const fs = require('fs');
// const express = require('express');
// const bodyParser = require('body-parser');
// //we could have used http.createserver(req,res) instead of express - but express offers other features 
// //that the first one such as flexibility, error handling, more methods.
// const app = express();
// app.use(bodyParser.json());

// // Initialize an empty object to store submitted data
// let submittedData = {};

// // Define route for handling requests to '/submit-data'
// app.all('/submit-data', (req, res) => {
    
//     try {
//         // Log request data
//         const requestData = `Method: ${req.method}, URL: ${req.url}, Body: ${JSON.stringify(req.body)}\n`;
//         fs.appendFile('serverLogs.log', requestData, (err) => {
//             if (err) console.error('Error writing to log file:', err);
//         });

//         if (req.method === 'GET') 
//         {
//             // Handle GET request: Retrieve and send the submitted data
//             const name = submittedData.name;
//             res.writeHead(200, {'Content-Type': 'text/plain'});
//             res.end(`Retrieved your name: ${name}`);
//         }

//         else if (req.method === 'POST') 
//         {
//             // Handle POST request: Extract and store the submitted data
//             const name = req.body.name;
//             submittedData = req.body;
//             res.writeHead(200, {'Content-Type': 'text/plain'});
//             res.end(`Received and stored your name: ${name}`);
//         } 
        
//         else if (req.method === 'PUT') 
//         {
//             // Handle PUT request: Update the submitted data
//             const name = req.body.name;
//             submittedData = req.body;
//             res.writeHead(200, {'Content-Type': 'text/plain'});
//             res.end(`Updated your name to: ${name}`);
//         } 
        
//         else if (req.method === 'DELETE') {
//             // Handle DELETE request: Clear the submitted data
//             submittedData = {};
//             res.writeHead(200, {'Content-Type': 'text/plain'});
//             res.end('Submitted data cleared');
//         } 
        
//         else 
//         {
//             // Unsupported method
//             res.writeHead(405, {'Content-Type': 'text/plain'});
//             res.end('Method Not Allowed');
//         }
//     } 
    
//     catch (error) 
//     {
//         // Log the error
//         fs.appendFile('serverErrors.log', `Error handling request: ${error}\n`, (err) => {
//             if (err) console.error('Error writing to error log:', err);
//         });

//         // Send an error response to the client
//         res.writeHead(500, {'Content-Type': 'text/plain'});
//         res.end('Internal Server Error');
//     }
// });

// // Create server
// const server = http.createServer(app);

// // Listen on port 3000
// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });





// const http = require('http');
// //require('http') - is used to import built-in HTTP module.
// //When you call require('http'), Node.js searches for the 'http' module within its core modules or 
// //within the node_modules directory of your project. 
// const fs = require('fs');
// // the same here require return module.export (special object) and assign it to the variable fs, that
// //way the variable fs is now a public API that other moduls can access it and use its functionallity
// //for example we can use fs to use appendFile(), readFile().. etc.

// //const - It does surve an important purpose in preventing accidental reassignment.


// //createserver is a method that return/creates ad instance of http.server
// //this instance i can configurate in order to handle requests and send me reponses.

// //req and res are two objects of a class http.incomingmassege and http.serverresponse
// //req contains information that is receieved like url, headers, body.
// //res is the response.

// //when creating a server we pass a callback function that is invoked whenever a request is made to the server
// //and it takes two parameters req and res as arguments - inside the callback function we typically handle the request that is made.

// //a call back function is a function that is passed as an argument to another function 
// const server = http.createServer((req, res) => {
//     try {
//         // Log request data
//         const requestData = `Method: ${req.method}, URL: ${req.url}, Body: ${JSON.stringify(req.body)}\n`;
//         fs.appendFile('serverLogs.log', requestData, (err) => {
//             if (err) console.error('Error writing to log file:', err);
//         });

//         // Handling different HTTP methods
//         if (req.method === 'GET') {
//             // Handle GET request
//             // Here you can fetch data from the server and send it as a response
//             res.writeHead(200, {'Content-Type': 'text/plain'});
//             res.end('GET request received');
//         } else if (req.method === 'POST') {
//             // Handle POST request
//             // Here you can receive data from the client and process it
//             res.writeHead(200, {'Content-Type': 'text/plain'});
//             res.end('POST request received');
//         } else if (req.method === 'PUT') {
//             // Handle PUT request
//             // Here you can update existing data on the server
//             res.writeHead(200, {'Content-Type': 'text/plain'});
//             res.end('PUT request received');
//         } else if (req.method === 'DELETE') {
//             // Handle DELETE request
//             // Here you can delete data from the server
//             res.writeHead(200, {'Content-Type': 'text/plain'});
//             res.end('DELETE request received');
//         } else {
//             // Handle unsupported HTTP methods
//             res.writeHead(405, {'Content-Type': 'text/plain'});
//             res.end('Method Not Allowed');
//         }
//     } catch (error) {
//         // Log the error
//         fs.appendFile('serverErrors.log', `Error handling request: ${error}\n`, (err) => {
//             if (err) console.error('Error writing to error log:', err);
//         });

//         // Send an error response to the client
//         res.writeHead(500, {'Content-Type': 'text/plain'});
//         res.end('Internal Server Error');
//     }
// });

// const PORT = 3000;

// server.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });

// const http = require('http');
// const fs = require('fs');
// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(bodyParser.json());

// // Initialize an empty object to store submitted data
// let submittedData = {};

// // Define route for handling GET requests to '/get-data'
// app.get('/get-data', (req, res) => {
//     try {
//         // Log request data
//         const requestData = `Method: ${req.method}, URL: ${req.url}\n`;
//         fs.appendFile('serverLogs.log', requestData, (err) => {
//             if (err) console.error('Error writing to log file:', err);
//         });

//         // Retrieve the submitted data from memory
//         const name = submittedData.name;

//         // Log retrieved data
//         const retrievedData = `Retrieved data: ${JSON.stringify(submittedData)}\n`;
//         fs.appendFile('serverLogs.log', retrievedData, (err) => {
//             if (err) console.error('Error writing to log file:', err);
//         });

//         // Send a response with the retrieved data
//         res.writeHead(200, {'Content-Type': 'text/plain'});
//         res.end(`Retrieved your name: ${name}`);
//     } catch (error) {
//         // Log the error
//         fs.appendFile('serverErrors.log', `Error handling request: ${error}\n`, (err) => {
//             if (err) console.error('Error writing to error log:', err);
//         });

//         // Send an error response to the client
//         res.writeHead(500, {'Content-Type': 'text/plain'});
//         res.end('Internal Server Error');
//     }
// });

// // Define route for handling POST requests to '/submit-data'
// app.post('/submit-data', (req, res) => {
//     try {
//         // Log request data
//         const requestData = `Method: ${req.method}, URL: ${req.url}, Body: ${JSON.stringify(req.body)}\n`;
//         fs.appendFile('serverLogs.log', requestData, (err) => {
//             if (err) console.error('Error writing to log file:', err);
//         });

//         // Extract the name from the request body
//         const name = req.body.name;

//         // Log the submitted data
//         const submittedDataLog = `Submitted data: ${JSON.stringify(req.body)}\n`;
//         fs.appendFile('serverLogs.log', submittedDataLog, (err) => {
//             if (err) console.error('Error writing to log file:', err);
//         });

//         // Store the submitted data in memory
//         submittedData = req.body;

//         // Send a response
//         res.writeHead(200, {'Content-Type': 'text/plain'});
//         res.end(`Received and stored your name: ${name}`);
//     } catch (error) {
//         // Log the error
//         fs.appendFile('serverErrors.log', `Error handling request: ${error}\n`, (err) => {
//             if (err) console.error('Error writing to error log:', err);
//         });

//         // Send an error response to the client
//         res.writeHead(500, {'Content-Type': 'text/plain'});
//         res.end('Internal Server Error');
//     }
// });

// // Define route for handling PUT requests to '/update-data'
// app.put('/update-data', (req, res) => {
//     try {
//         // Log request data
//         const requestData = `Method: ${req.method}, URL: ${req.url}, Body: ${JSON.stringify(req.body)}\n`;
//         fs.appendFile('serverLogs.log', requestData, (err) => {
//             if (err) console.error('Error writing to log file:', err);
//         });

//         // Send a response
//         res.writeHead(200, {'Content-Type': 'text/plain'});
//         res.end('PUT request received');
//     } catch (error) {
//         // Log the error
//         fs.appendFile('serverErrors.log', `Error handling request: ${error}\n`, (err) => {
//             if (err) console.error('Error writing to error log:', err);
//         });

//         // Send an error response to the client
//         res.writeHead(500, {'Content-Type': 'text/plain'});
//         res.end('Internal Server Error');
//     }
// });
// // Define route for handling DELETE requests to '/delete-data'
// app.delete('/delete-data', (req, res) => {
//     try {
//         // Log request data
//         const requestData = `Method: ${req.method}, URL: ${req.url}\n`;
//         fs.appendFile('serverLogs.log', requestData, (err) => {
//             if (err) console.error('Error writing to log file:', err);
//         });

//         // Clear the submitted data from memory
//         submittedData = {};

//         // Send a response
//         res.writeHead(200, {'Content-Type': 'text/plain'});
//         res.end('DELETE request received and submitted data cleared');
//     } catch (error) {
//         // Log the error
//         fs.appendFile('serverErrors.log', `Error handling request: ${error}\n`, (err) => {
//             if (err) console.error('Error writing to error log:', err);
//         });

//         // Send an error response to the client
//         res.writeHead(500, {'Content-Type': 'text/plain'});
//         res.end('Internal Server Error');
//     }
// }); 

// // Create server
// const server = http.createServer(app);

// // Listen on port 3000
// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });




