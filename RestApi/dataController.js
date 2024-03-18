const fs = require('fs').promises; // Importing fs module with promises support
const dataFilePath = 'data.json';

const dataController =
{
    getData: async (req, res) => {
        try {
            const data = await fs.readFile(dataFilePath);
            const submittedData = JSON.parse(data);
            const name = submittedData.name;
            res.status(200).send(`Retrieved your name: ${name}`);
        }
        catch (error) {
            console.error('Error reading data file:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    submitData: async (req, res) => {
        try {
            const name = req.body.name;
            const submittedData = req.body;
            await fs.writeFile(dataFilePath, JSON.stringify(submittedData));
            res.status(200).send(`Received and stored your name: ${name}`);
        }
        catch (error) {
            console.error('Error writing to data file:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    updateData: async (req, res) => {
        try {
            const submittedData = req.body;
            await fs.writeFile(dataFilePath, JSON.stringify(submittedData));
            res.status(200).send('PUT request received and data updated');
        }
        catch (error) {
            console.error('Error updating data file:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    deleteData: async (req, res) => {
        try {
            await fs.writeFile(dataFilePath, '{}');
            res.status(200).send('Submitted data cleared');
        }
        catch (error) {
            console.error('Error clearing data file:', error);
            res.status(500).send('Internal Server Error');
        }
    }
};

module.exports = dataController;
