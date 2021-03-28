const express = require('express');

const router = express.Router();

const taskController = require('../app/controllers/task.controllers');

// Retrieve all Tasks
router.get('/', taskController.getAll);

// Create a new Task
router.post('/', taskController.create);

// Retrieve a single Task
router.get('/:id', taskController.getOne);

// Update a Task with id
router.put('/:id', taskController.update);

// Delete a Task with id
router.delete('/:id', taskController.delete);

module.exports = router;
