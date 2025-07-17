const express = require('express');
const router = express.Router();

const employeesController = require('../controllers/employees');

router.get('/', employeesController.getAllEmployees);
router.get('/:id', employeesController.getEmployeeById);

module.exports = router;