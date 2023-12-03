
import Task from '../models/tasks.js'

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.getAllTasks();
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
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({error: error.message});  
    }
}

export const findTask = async (req, res) => {
    const id = req.params.id;
    try {
        const getSingleTask = await Task.getTask(id);
        res.status(200).json(getSingleTask);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
