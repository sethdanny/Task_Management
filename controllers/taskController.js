
import Task from '../models/tasks.js'

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.getAllTasks(1, 10);
        if (!tasks) {
            return res.status(404).json({error: 'Tasks not found!'});
        }
        res.json(tasks);
    } catch (error) {
        res.status(500).json({error: error.message})     
    }
}

export const createTask = async (req, res) => {
    const { title, description, status, dueDate, user_id} = req.body;
    try {
        const newTask = new Task(null, title, description, status, dueDate, user_id);
        await newTask.save();
        if (!newTask) {
            return res.status(404).json({error: 'Task not created!'});
        }
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({error: error.message});  
    }
}

export const findTask = async (req, res) => {
    const id = req.params.id;
    try {
        const getSingleTask = await Task.getTask(id);
        if (!getSingleTask) {
            return res.status(404).json({error: `Task not found with the ID ${id}`})
        }
        res.status(200).json(getSingleTask);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const updatedTaskData = async (req, res) => {
    const task_id = req.params.id;
    const updatedData = req.body;
    try {
        const result = await Task.updateTask(task_id, updatedData);
        if (result !== null) {
            res.status(200).json(result);
        } else {
            res.status(404).json({error: 'task not found!'});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

export const deleteTask = async (req, res) => {
    const task_id = req.params.id;
    try {
        const isDeleted = await Task.deleteTask(task_id);
        if (isDeleted) {
            res.status(204).send();
        } else {
            res.status(404).json({error: 'Task not found!'});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}