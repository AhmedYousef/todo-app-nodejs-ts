const express = require('express');
const router = express.Router();
const todos = require('../../Todos');

// Get All Tasks
router.get('/todos', (req, res) => res.json(todos));
router.get('/health', (req, res) => res.json(todos));

// Get Single Task
router.get('todos/:id', (req, res) => {
    const found = todos.some(todo => todo.id === parseInt(req.params.id));

    if (found) {
        res.json(todos.filter(todo => todo.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No todo with the id of ${req.params.id}` });
    }
});

// Create Task
router.post('todos/', (req, res) => {
    const newTodo = {
        id: uuid.v4(),
        title: req.body.title
    }

    if (!newTodo.title) {
        return res.status(400).json({ msg: 'Please include a title' });
    }

    todos.push(newTodo);
    res.json(todos);
});

// Update Task
router.patch('todos/:id', (req, res) => {
    const found = todos.some(todo => todo.id === parseInt(req.params.id));

    if (found) {
        const updatedTodo = req.body;
        todos.forEach(todo => {
            if (todo.id === parseInt(req.params.id)) {
                todo.title = updatedTodo.title ? updatedTodo.title : todo.title;

                res.json({ msg: 'Todo updated', todo });
            }
        });
    } else {
        res.status(400).json({ msg: `No todo with the id of ${req.params.id}` });
    }
});

// Delete Task
router.delete('todos/:id', (req, res) => {
    const found = todos.some(todo => todo.id === parseInt(req.params.id));

    if (found) {
        res.json({ msg: 'Todo deleted', todos: todos.filter(todo => todo.id !== parseInt(req.params.id)) });
    } else {
        res.status(400).json({ msg: `No todo with the id of ${req.params.id}` });
    }
});

module.exports = router;