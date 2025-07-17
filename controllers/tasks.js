const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllTasks = async (req, res) => {
    const result = await mongodb.getDatabase().db('crud-project').collection('tasks').find();
    result.toArray().then((tasks) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(tasks);
    });
};

const getTaskById = async (req, res) => {
    const employeeId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('crud-project').collection('tasks').find({ _id: employeeId });
    result.toArray().then((tasks) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(tasks[0]);
    });
};

module.exports = {
    getAllTasks,
    getTaskById
};