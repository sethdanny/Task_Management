import redis from 'redis';

const client = redis.createClient(process.env.REDIS_URL);

export const cacheMiddleWare = (key) => (req, res, next) => {
    client.get(key, (err, data) => {
        if (err) throw new Error(err);
        
        if (data !== null) {
            res.send(JSON.parse(data));
        } else {
            next();
        }
    });
};

export const cacheResponse = (key, data) => {
    client.setex(key, 3600, JSON.stringify(data));
};