const express = require('express');
const router = express.Router();
const dataController = require('./dataController');

// Routes
router.get('/get-data', dataController.getData);
router.post('/submit-data', dataController.submitData);
router.put('/update-data', dataController.updateData);
router.delete('/delete-data', dataController.deleteData);

module.exports = router;