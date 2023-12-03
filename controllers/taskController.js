
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



