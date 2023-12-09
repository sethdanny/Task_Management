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