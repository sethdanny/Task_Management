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

    it('should handle specific database errors', async () => {
        const mockExecute = jest.spyOn(db, 'execute');
        const expectedError = new Error('Database connection lost');
        mockExecute.mockRejectedValueOnce(expectedError);
        await expect(Task.getAllTasks()).rejects.toThrowError(expectedError);
    });
    
    it('should handle errors', async () => {
        jest.spyOn(db, 'execute').mockRejectedValueOnce(new Error('Database error'));
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
        jest.spyOn(db, 'execute').mockRejectedValueOnce(new Error('Database error'));
        //jest.spyOn(db, 'execute').mockImplementation(() => Promise.reject(new Error('Database error')));
    
        await expect(Task.getTask(task_id)).rejects.toThrowError('Database error');
      });
});

describe('Task.updateTask', () => {
    it('should update task and return the updated task', async () => {
        const mockExecute = jest.spyOn(db, 'execute');
        const mockGetTask = jest.spyOn(Task, 'getTask');
    
        const task_id = 1;
        const updatedTaskData = {
          title: 'Updated Title',
          description: 'Updated Description',
          status: 'completed',
          dueDate: '2023-12-31',
        };
    
        const expectedUpdatedTask = {
          task_id: 1,
          title: 'Updated Title',
          description: 'Updated Description',
          status: 'completed',
          dueDate: '2023-12-31',
          user_id: null,
        };
    
        mockExecute.mockReturnValueOnce([
          [{ affectedRows: 1 }],
          null
        ]);
        mockGetTask.mockReturnValueOnce(expectedUpdatedTask);
    
        const updatedTask = await Task.updateTask(task_id, updatedTaskData);
    
        expect(mockExecute).toHaveBeenCalledWith(
          `UPDATE tasks SET title = ?, description = ?, status = ?, dueDate = ? WHERE task_id = ?`,
          [
            updatedTaskData.title,
            updatedTaskData.description,
            updatedTaskData.status,
            updatedTaskData.dueDate,
            task_id,
          ]
        );
        expect(mockGetTask).toHaveBeenCalledWith(task_id);
        expect(updatedTask).toEqual(expectedUpdatedTask);
      });

      it('should return null when task is not found for update', async () => {
        const mockExecute = jest.spyOn(db, 'execute');
        mockExecute.mockReturnValueOnce([
          [{ affectedRows: 0 }],
          null
        ]);
      
        const task_id = 1;
        const updatedTaskData = {
          title: 'Updated Title',
          description: 'Updated Description',
          status: 'completed',
          dueDate: '2023-12-31',
        };
      
        jest.spyOn(Task, 'getTask').mockReturnValueOnce(null);
      
        const updatedTask = await Task.updateTask(task_id, updatedTaskData);
      
        expect(mockExecute).toHaveBeenCalledWith(
          'UPDATE tasks SET title = ?, description = ?, status = ?, dueDate = ? WHERE task_id = ?',
          [
            updatedTaskData.title,
            updatedTaskData.description,
            updatedTaskData.status,
            updatedTaskData.dueDate,
            task_id,
          ]
        );
        expect(updatedTask).toBeNull();
      });
    it('should handle errors', async () => {
        jest.spyOn(db, 'execute').mockRejectedValueOnce(new Error('Database error'));
        const task_id = 1;
        await expect(Task.getTask(task_id)).rejects.toThrowError('Database error');
    });
});

describe('Task.delete a task', () => {
    it('should delete task and return true', async () => {
        const mockExecute = jest.spyOn(db, 'execute');
        mockExecute.mockReturnValueOnce([{ affectedRows: 1 }, null]);
      
        const task_id = 1;
      
        const deleted = await Task.deleteTask(task_id);
      
        expect(mockExecute).toHaveBeenCalledWith('DELETE FROM tasks WHERE task_id = ?', [task_id]);
        expect(deleted).toBe(true);
      });

      it('should return false when task is not found for deletion', async () => {
        const mockExecute = jest.spyOn(db, 'execute');
        mockExecute.mockReturnValueOnce([[{ affectedRows: 0 }], null]);
      
        const task_id = 2;
      
        const deleted = await Task.deleteTask(task_id);
      
        expect(mockExecute).toHaveBeenCalledWith('DELETE FROM tasks WHERE task_id = ?', [task_id]);
        expect(deleted).toBeFalsy();
      });

      it('should handle errors', async () => {
        jest.spyOn(db, 'execute').mockRejectedValueOnce(new Error('Database error'));
        const task_id = 1;

        await expect(Task.deleteTask(task_id)).rejects.toThrowError('Database error');
    });
});