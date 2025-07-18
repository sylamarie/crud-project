const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllTasks = async (req, res) => {
    //#swagger.tags = ['Tasks']
    const result = await mongodb.getDatabase().db('crud-project').collection('tasks').find();
    result.toArray().then((tasks) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(tasks);
    });
};

const getTaskById = async (req, res) => {
    //#swagger.tags = ['Tasks']
    const employeeId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('crud-project').collection('tasks').find({ _id: employeeId });
    result.toArray().then((tasks) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(tasks[0]);
    });
};

const createTask = async (req, res) => {
    //#swagger.tags = ['Tasks']
    const task = {
        title: req.body.title,
        description: req.body.description,
        assignedTo: req.body.assignedTo,
        priority: req.body.priority,
        status: req.body.status,
        dueDate: req.body.dueDate,
        createdAt: new Date(),
        updatedAt: new Date(),
        remarks: req.body.remarks
    };
    const response = await mongodb.getDatabase().db('crud-project').collection('tasks').insertOne(task);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while creating the task.');
    }
};

const updateTask = async (req, res) => {
    //#swagger.tags = ['Tasks']
    const taskId = new ObjectId(req.params.id);
    const task = {
        title: req.body.title,
        description: req.body.description,
        assignedTo: req.body.assignedTo,
        priority: req.body.priority,
        status: req.body.status,
        dueDate: req.body.dueDate,
        createdAt: new Date(),
        updatedAt: new Date(),
        remarks: req.body.remarks
    };
    const response = await mongodb.getDatabase().db('crud-project').collection('tasks').replaceOne({ _id: taskId }, task);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while updating the task.');
    }
};

const deleteTask = async (req, res) => {
    //#swagger.tags = ['Tasks']
    const taskId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('crud-project').collection('tasks').deleteOne({ _id: taskId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while deleting the task.');
    }
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};