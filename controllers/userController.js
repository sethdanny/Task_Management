import User from "../models/user.js";
import isValidEmail from "../utils/emailValidation.js";

export const registerUser = async (req, res) => {
    const { firstName, lastName, email, mobile, password } = req.body;
    try {
        if (!firstName || !lastName || !mobile || !password || !isValidEmail(email)) {
            return res.status(400).json({ error: 'Invalid Email or Missing required fields' });
          }
        const existingUser = await User.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({error: 'Email already registered'});
        }
        const newUser = new User(null, firstName, lastName, email, mobile, password);
        await newUser.save();
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export const getUser = async (req, res) => {
    const user_id = req.params.id;
    console.log(user_id);
    try {
        const singleUser = await User.getUserById(user_id);
        if (!singleUser) return res.status(404).json({error: 'User not found!'});
        res.status(200).json(singleUser);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const getUsers = async(req, res) => {
    try {
        const users = await User.getAllUsers(1, 10);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const updateUser = async (req, res) => {
    const user_id = req.params.id;
    const updatedUserData = req.body;
    try {
        const result = await User.updateUser(user_id, updatedUserData);
        if (result !== null) {
            res.status(200).json(result);
        } else {
            res.status(404).json({error: 'User not found!'});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const deleteUser = async (req, res) => {
    const user_id = req.params.id;
    try {
        const isDeleted = await User.deleteUser(user_id);
        if (isDeleted) {
            res.status(204).send();
        } else {
            res.status(404).json({error: 'User not found!'});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}