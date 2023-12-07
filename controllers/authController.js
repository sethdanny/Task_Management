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

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60
        })
        res.cookie('refreshToken', refreshtoken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({ result: user, accessToken, refreshtoken });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    try {
        if (!refreshToken) {
            return res.status(401).json({error: 'RefreshToken not found!'});
        }
        jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({error: 'Invalid refreshToken'});
            }
            const accessToken = jwt.sign({user_id: user.user_id}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: true,
                maxAge: 60 * 60 * 1000,
            });

            res.status(200).json({ accessToken: accessToken });
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};