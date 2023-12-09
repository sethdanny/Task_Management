import Task from '../../models/tasks.js';
import db from '../../config/database.js';
jest.mock('../../config/database.js');


describe('Task.getAllTasks', () => {

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('should return all tasks', async () => {
        const mockExecute = jest.spyOn(db, 'execute');
        mockExecute.mockReturnValueOnce([[{id: 1, title: 'Create a product management board'}], null]);

        const tasks = await Task.getAllTasks();
        expect(tasks).toEqual([{id: 1, title: 'Create a product management board'}]);
        expect(mockExecute).toHaveBeenCalledWith(`SELECT * FROM tasks LIMIT ? OFFSET ?`, [10, 0])
    });

    it('should handle errors', async () => {
        // Mock db.execute to throw an error
        jest.spyOn(db, 'execute').mockImplementation(() => Promise.reject(new Error('Database error')));
    
        await expect(Task.getAllTasks()).rejects.toThrowError('Database error');
      });
})

describe('Task.getTask', () => {

    it('should return a specific task', async () => {
        const task_id = 1;
        const mockexecute = jest.spyOn(db, 'execute');
        mockexecute.mockReturnValueOnce([[{id: task_id, title: 'Task 1'}], null]);

        const task = await Task.getTask(task_id);
        expect(task).toEqual({ id: task_id, title: 'Task 1' });
        expect(db.execute).toHaveBeenCalledWith('SELECT * FROM tasks WHERE task_id = ?', [1]);
    })

    it('should return error when task not found', async () => {
        
        const mockExecute = jest.spyOn(db, 'execute');
        mockExecute.mockReturnValueOnce([[], null]);

        const task_id = 2;
        const errorResponse = {error: `Task not found with the ID ${task_id}`}

        const task = await Task.getTask(task_id);
        expect(task).toEqual(errorResponse);
        expect(mockExecute).toHaveBeenCalledWith(`SELECT * FROM tasks WHERE task_id = ?`, [task_id])

    })
    
    it('should handle errors', async () => {
        const task_id = 1;
        jest.spyOn(db, 'execute').mockImplementation(() => Promise.reject(new Error('Database error')));
    
        await expect(Task.getTask(task_id)).rejects.toThrowError('Database error');
      });
});