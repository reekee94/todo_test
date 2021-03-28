const Task = require('../models/task.model');
const helpers = require('../helpers/functions.helpers');
const createSchema = require('../validators/task/create_task.validator');
const updateSchema = require('../validators/task/update_task.validator');

const keys = ['title', 'cat', 'content', 'completed', 'start_date', 'due_date'];


module.exports = {
    // Retrieve and return all tasks from the database
    getAll: async (req, res) => {
        const { escapeRegex, generatePaginationMeta } = helpers;
        // handle query string
        const page = Number(req.query.page) || 1;
        const perPage = Number(req.query.perPage) || 10;
        const search = {};
        if (req.query.search) {
            search.cat = new RegExp(escapeRegex(req.query.search), 'gi');
        }

        try {
            const sort = { due_date: 1, created_at: -1 };
            const projection = { updated_at: 0 };
            const totalTasks = await Task.countDocuments(search);
            const allCategories = await Task.distinct('cat' )
            const tasks = await Task.find(search, projection)
                .sort(sort)
                .limit(perPage)
                .skip(perPage * page - perPage);

            res.status(206).json({
                data: tasks,
                meta: generatePaginationMeta(page, perPage, totalTasks),
                categoryList: allCategories,
            });
        } catch (error) {
            res.status(500).json({
                message: error.message || 'An error occurred',
            });
        }
    },

    // Create and save a new task
    create: async (req, res) => {
        const { error: validationError } = createSchema.validate(
            req.body,
          {"abortEarly": false}
        );

        if (validationError) {
            return res
                .status(400)
                .json(helpers.formatValidationErrors(validationError));
        }

        const taskContent = {};
        for (let i = 0, len = keys.length; i < len; i += 1) {
            if (req.body[keys[i]] !== undefined) {
                taskContent[keys[i]] = req.body[keys[i]];
            }
        }

        // Save task to the database
        try {
            const task = new Task(taskContent);
            await task.save();

            res.status(201).json(task);
        } catch (error) {
            res.status(500).json({
                error: {
                    code: 500,
                    message: error.message,
                },
            });
        }
    },

    // Retrieve a single task with id provided in the request
    getOne: async (req, res) => {
        const projection = {
            _id: 1,
            title: 1,
            completed: 1,
            content: 1,
            cat: 1,
            start_date: 1,
            due_date: 1,
            created_at: 1,
        };

        try {
            const task = await Task.findById(req.params.id, projection);
            if (!task) {
                return res.status(404).json({
                    error: {
                        code: 404,
                        message: 'Task not found',
                    },
                });
            }

            res.json(task);
        } catch (error) {
            if (error.kind === 'ObjectId') {
                return res.status(404).json({
                    error: {
                        code: 404,
                        message: 'Task not found',
                    },
                });
            }

            res.status(500).json({
                error: {
                    code: 500,
                    message: error.message || 'An error occurred',
                },
            });
        }
    },

    // Update a single task with id provided in the request
    update: async (req, res) => {
        const taskId = req.params.id;

        const { error: validationError } = updateSchema.validate(
            req.body,
          {"abortEarly": false}
        );

        if (validationError) {
            return res
                .status(400)
                .json(helpers.formatValidationErrors(validationError));
        }

        const taskContent = {};
        for (let i = 0, len = keys.length; i < len; i += 1) {
            // all are optional
            if (req.body[keys[i]] !== undefined) {
                taskContent[keys[i]] = req.body[keys[i]];
            }
        }

        // Find a task and update it
        try {
            const updatedTask = await Task.findByIdAndUpdate(
                taskId,
                taskContent,
                { new: true }
            );

            if (!updatedTask) {
                return res.status(404).json({
                    error: {
                        code: 404,
                        message: 'Task not found',
                    },
                });
            }

            res.json(updatedTask);
        } catch (error) {
            if (error.kind === 'ObjectId') {
                return res.status(404).json({
                    error: {
                        code: 404,
                        message: 'Task not found',
                    },
                });
            }

            res.status(500).json({
                error: {
                    code: 500,
                    message: error.message || 'An error occurred',
                },
            });
        }
    },

    // Delete a single task with id provided in the request
    delete: async (req, res) => {
        try {
            const deletedTask = await Task.findByIdAndDelete(req.params.id);
            if (!deletedTask) {
                return res.status(404).json({
                    error: {
                        code: 404,
                        message: 'Task not found',
                    },
                });
            }

            res.json(deletedTask);
        } catch (error) {
            if (error.kind === 'ObjectId' || error.name === 'NotFound') {
                return res.status(404).json({
                    error: {
                        code: 404,
                        message: 'Task not found',
                    },
                });
            }

            res.status(500).json({
                error: {
                    code: 500,
                    message: error.message || 'An error occurred',
                },
            });
        }
    },
};
