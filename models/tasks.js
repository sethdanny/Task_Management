import db from '../config/database.js';

class Task {
    constructor(task_id, title, description, status, dueDate, user_id) {
        this.task_id = task_id,
        this.title = title,
        this.description = description,
        this.status = status,
        this.dueDate = dueDate,
        this.user_id = user_id
    }

    static async getAllTasks(page = 1, pageSize = 10) {
        const offset = (page - 1) * pageSize;
        const [rows] = await db.execute(`SELECT * FROM tasks LIMIT ? OFFSET ?`,
        [pageSize, offset]);
        return rows;
    }

    static async getTask(task_id) {
        const [rows] = await db.execute(`SELECT * FROM tasks WHERE task_id = ?`, [task_id]);
        return rows[0];
    }

    async save() {
        const [result] = await db.execute(
            `INSERT INTO tasks (title, description, status, dueDate, user_id) VALUES (?, ?, ?, ?, ?)`,
            [this.title, this.description, this.status, this.dueDate, this.user_id]);
            this.id = result.insertId;
            return this;
    }

    static async updateTask(task_id, updatedTaskData) {
        const [result] = await db.execute(
            `UPDATE tasks SET title = ?, description = ?, status = ?, dueDate = ? WHERE task_id = ?`,
            [updatedTaskData.title, updatedTaskData.description, updatedTaskData.status, updatedTaskData.dueDate, task_id]);

            if (result.affectedRows > 0) {
                const updatedTask = await Task.getTask(task_id);
                return updatedTask;
              } else {
                return null;
              }
    }

    static async deleteTask(task_id) {
        const [result] = await db.execute('DELETE FROM tasks WHERE task_id = ?', [task_id]);
        return result.affectedRows > 0;
      }
}

export default Task;