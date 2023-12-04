import db from '../config/database.js';
import bcrypt from 'bcrypt';


class User {
    constructor(user_id, firstName, lastName, email, mobile, password) {
        this.user_id = user_id,
        this.firstName = firstName,
        this.lastName = lastName,
        this.email = email,
        this.mobile = mobile,
        this.password = password
    }

    static async getAllUsers (page = 1, pageSize = 10) {
        const offset = (page - 1) * pageSize;
        const [rows] = await db.execute(`SELECT * FROM users LIMIT ? OFFSET ?`,
        [pageSize, offset])
        return rows;
    }

    static async getUserById(user_id) {
        const [rows] = await db.execute(`SELECT * FROM users WHERE user_id = ?`, [user_id]);
        return rows[0];
    }

    static async getUserByEmail(email) {
        const [rows] = await db.execute(`SELECT * FROM users WHERE email = ?`, [email]);
        return rows[0];
    }

    async save() {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        const [result] = await db.execute(`INSERT INTO users (firstName, lastName, email, mobile, password)
        VALUES (?, ?, ?, ?, ?)`, 
        [this.firstName, this.lastName, this.email, this.mobile, hashedPassword]);
        this.id = result.insertId;
        return this;
    }

    static async updateUser(user_id, updatedUserData) {
        if (updatedUserData.password) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        }
        const [result] = await db.execute(
            `UPDATE users SET firstName = ?, lastName = ?, email = ?, mobile = ?, password = ? WHERE user_id = ?`,
            [updatedUserData.firstName, updatedUserData.lastName, updatedUserData.email, updatedUserData.mobile, updatedUserData.password, user_id]);

            if (result.affectedRows > 0) {
                const updatedUser = await User.getUserById(user_id);
                return updatedUser;
              } else {
                return null;
              }
    }

    static async deleteUser(user_id) {
        const [result] = await db.execute('DELETE FROM users WHERE user_id = ?', [user_id]);
        return result.affectedRows > 0;
      }
}

export default User;