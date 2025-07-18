const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllEmployees = async (req, res) => {
    //#swagger.tags = ['Employees']
    const result = await mongodb.getDatabase().db('crud-project').collection('employees').find();
    result.toArray().then((employees) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(employees);
    });
};

const getEmployeeById = async (req, res) => {
    //#swagger.tags = ['Employees']
    const employeeId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('crud-project').collection('employees').find({ _id: employeeId });
    result.toArray().then((employees) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(employees[0]);
    });
};

const createEmployee = async (req, res) => {
    //#swagger.tags = ['Employees']
    const employee = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        department: req.body.department,
        status: req.body.status,
        dateHired: req.body.dateHired,
        phone: req.body.phone
    };
    const response = await mongodb.getDatabase().db('crud-project').collection('employees').insertOne(employee);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while creating the employee.');
    }
};

const updateEmployee = async (req, res) => {
    //#swagger.tags = ['Employees']
    const employeeId = new ObjectId(req.params.id);
    const employee = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        department: req.body.department,
        status: req.body.status,
        dateHired: req.body.dateHired,
        phone: req.body.phone
    };
    const response = await mongodb.getDatabase().db('crud-project').collection('employees').replaceOne({ _id: employeeId }, employee);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while updating the employee.');
    }
};

const deleteEmployee = async (req, res) => {
    //#swagger.tags = ['Employees']
    const employeeId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('crud-project').collection('employees').deleteOne({ _id: employeeId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while deleting the employee.');
    }
};

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
};