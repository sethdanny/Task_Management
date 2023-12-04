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