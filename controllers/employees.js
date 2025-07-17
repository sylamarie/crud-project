const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllEmployees = async (req, res) => {
    const result = await mongodb.getDatabase().db('crud-project').collection('employees').find();
    result.toArray().then((employees) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(employees);
    });
};

const getEmployeeById = async (req, res) => {
    const employeeId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('crud-project').collection('employees').find({ _id: employeeId });
    result.toArray().then((employees) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(employees[0]);
    });
};

module.exports = {
    getAllEmployees,
    getEmployeeById
};