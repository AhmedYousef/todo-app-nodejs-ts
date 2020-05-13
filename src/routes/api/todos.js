const express = require('express');
const uuid = require('uuid');
const todos = require('../../Todos');
const logger = require('../../middlewares/logger');

const router = express.Router();

const logReqAndRes = (req, res) => {
    logger.info('/ Request', { request: req.get('host') + req.originalUrl });
    logger.info('/ Response', res);
};

// Get All Tasks
router.get('/todos', (req, res) => {
    res.json(todos);
    logReqAndRes(req, todos);
});
router.get('/health', (req, res) => {
    res.json(todos);
    logReqAndRes(req, todos);
});

// Get Single Task
router.get('/todos/:id', (req, res) => {
    const found = todos.some(todo => todo.id === req.params.id);

    if (found) {
        let filteredTodos = todos.filter(todo => todo.id === req.params.id);
        res.json(filteredTodos);
        logReqAndRes(req, filteredTodos);
    } else {
        res.status(400).json({ msg: `No todo with the id of ${req.params.id}` });
    }
});

// Create Task
router.post('/todos', (req, res) => {
    const newTodo = {
        id: uuid.v4(),
        title: req.body.title
    }

    if (!newTodo.title) {
        return res.status(400).json({ msg: 'Please include a title' });
    }

    todos.push(newTodo);
    res.json(todos);
    logReqAndRes(req, todos);
});

// Update Task
router.patch('/todos/:id', (req, res) => {
    const found = todos.some(todo => todo.id === req.params.id);

    if (found) {
        const updatedTodo = req.body;
        todos.forEach(todo => {
            if (todo.id === req.params.id) {
                todo.title = updatedTodo.title ? updatedTodo.title : todo.title;
                res.json({ msg: 'Todo updated', todo });
                logReqAndRes(req, todo);
            }
        });
    } else {
        res.status(400).json({ msg: `No todo with the id of ${req.params.id}` });
    }
});

// Delete Task
router.delete('/todos/:id', (req, res) => {
    const found = todos.some(todo => todo.id === req.params.id);

    if (found) {
        let removeIndex = todos.map(todo => todo.id).indexOf(req.params.id);
        let removedTodo = todos.splice(removeIndex, 1);
        res.json({ msg: 'Todo deleted', todo: removedTodo });
        logReqAndRes(req, removedTodo);
    } else {
        res.status(400).json({ msg: `No todo with the id of ${req.params.id}` });
    }
});

module.exports = router;