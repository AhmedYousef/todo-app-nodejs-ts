import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from 'uuid';
import todos from "../../Todos";
import logger from "../../middlewares/logger";
import TodoeObj from "../../type-aliases/todo";

const router = express.Router();

const logReqAndRes = (req: Request, res: object[] | object) => {
    logger.info("/ Request", { request: req.get("host") + req.originalUrl });
    logger.info("/ Response", res);
};

const validateCSRFToken = (req: Request, res: Response) => {
    // Facing "ForbiddenError: invalid csrf token"
    // console.log(req.csrfToken());
    // if (!req.csrfToken()) {
    //     return res.status(400).json({ msg: 'CSRF Token does NOT exist' });
    // }
};

router.get("/todos", (req: Request, res: Response) => {
    validateCSRFToken(req, res);
    logReqAndRes(req, todos);
    res.json(todos);
});

router.get("/health", (req: Request, res: Response) => {
    res.json(todos);
});

router.get("/todos/:id", (req: Request, res: Response) => {
    validateCSRFToken(req, res);
    const found: boolean = todos.some((todo) => todo.id === req.params.id);

    if (found) {
        let filteredTodos: object[] = todos.filter(
            (todo) => todo.id === req.params.id
        );
        res.json(filteredTodos);
        logReqAndRes(req, filteredTodos);
    } else {
        res.status(400).json({ msg: `No todo with the id of ${req.params.id}` });
    }
});

router.post("/todos", (req, res) => {
    validateCSRFToken(req, res);
    const newTodo: TodoeObj = {
        id: uuidv4(),
        text: req.body.text,
        isCompleted: false,
    };

    if (!newTodo.text) {
        return res.status(400).json({ msg: "Please include a text" });
    }

    todos.push(newTodo);
    res.json(newTodo);
    logReqAndRes(req, todos);
});

router.patch("/todos/:id", (req, res) => {
    validateCSRFToken(req, res);
    const found: boolean = todos.some((todo) => todo.id === req.params.id);

    if (found) {
        const updatedTodo: TodoeObj = req.body;
        todos.forEach((todo) => {
            if (todo.id === req.params.id) {
                todo.text = updatedTodo.text ? updatedTodo.text : todo.text;
                todo.isCompleted = updatedTodo.isCompleted ? updatedTodo.isCompleted : todo.isCompleted;
                res.json({ msg: "Todo updated", todo });
                logReqAndRes(req, todo);
            }
        });
    } else {
        res.status(400).json({ msg: `No todo with the id of ${req.params.id}` });
    }
});

router.delete("/todos/:id", (req, res) => {
    validateCSRFToken(req, res);
    const found = todos.some((todo) => todo.id === req.params.id);

    if (found) {
        let removeIndex = todos.map((todo) => todo.id).indexOf(req.params.id);
        let removedTodo = todos.splice(removeIndex, 1);
        res.json({ msg: "Todo deleted", todo: removedTodo });
        logReqAndRes(req, removedTodo);
    } else {
        res.status(400).json({ msg: `No todo with the id of ${req.params.id}` });
    }
});

export default router;
