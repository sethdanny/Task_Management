import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    try {
        if (!token) {
            return res.status(401).json({error: 'Unauthorized!'});
        } else {
            jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
                if (err) return res.status(403).json({error: 'Invalid token'});
                req.user = user;
                next();
            })
        }
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default authenticate;