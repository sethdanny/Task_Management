import User from "../models/user.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.getUserByEmail(email);
        if (!user) return res.status(401).json({error: 'Invalid credentials'});

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({error: 'Invalid password!'});

        const accessToken = jwt.sign({user_id: user.user_id}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});

        const refreshtoken = jwt.sign({user_id: user.user_id}, process.env.JWT_SECRET_KEY, {expiresIn: '7d'});

        res.status(200).json({ accessToken, refreshtoken });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}