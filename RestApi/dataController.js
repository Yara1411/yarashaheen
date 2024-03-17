const fs = require('fs');
const dataFilePath = 'data.json';

const dataController = {
    getData: (req, res) => {
        try {
            // Read data from file
            fs.readFile(dataFilePath, (err, data) => {
                if (err) {
                    console.error('Error reading data file:', err);
                    res.status(500).send('Internal Server Error');
                    return;
                }
                const submittedData = JSON.parse(data);
                const name = submittedData.name;
                res.status(200).send(`Retrieved your name: ${name}`);
            });
        } catch (error) {
            console.error('Error getting data:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    submitData: (req, res) => {
        try {
            const name = req.body.name;
            const submittedData = req.body;
            fs.writeFile(dataFilePath, JSON.stringify(submittedData), (err) => {
                if (err) {
                    console.error('Error writing to data file:', err);
                    res.status(500).send('Internal Server Error');
                    return;
                }
                res.status(200).send(`Received and stored your name: ${name}`);
            });
        } catch (error) {
            console.error('Error submitting data:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    updateData: (req, res) => {
        try {
            const requestData = `Method: ${req.method}, URL: ${req.url}, Body: ${JSON.stringify(req.body)}\n`;
            const submittedData = req.body;
            fs.writeFile(dataFilePath, JSON.stringify(submittedData), (err) => {
                if (err) {
                    console.error('Error updating data file:', err);
                    res.status(500).send('Internal Server Error');
                    return;
                }
                res.status(200).send('PUT request received and data updated');
            });
        } catch (error) {
            console.error('Error updating data:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    deleteData: (req, res) => {
        try {
            fs.writeFile(dataFilePath, '{}', (err) => {
                if (err) {
                    console.error('Error clearing data file:', err);
                    res.status(500).send('Internal Server Error');
                    return;
                }
                res.status(200).send('Submitted data cleared');
            });
        } catch (error) {
            console.error('Error deleting data:', error);
            res.status(500).send('Internal Server Error');
        }
    }
};

module.exports = dataController;
