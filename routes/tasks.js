const express = require('express');
const router = express.Router();

const tasksController = require('../controllers/tasks');

router.get('/', tasksController.getAllTasks);

router.get('/:id', tasksController.getTaskById);

module.exports = router;