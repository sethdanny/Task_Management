import NodeCache from "node-cache";
const cache = new NodeCache();

const cacheMiddleware = (req, res, next) => {
    if (req.method !== 'GET') {
        console.log('Cannot cache non-GET methods');
        return next();
    }

    const key = req.originalUrl + req.method;
    const cachedData = cache.get(key);

    if (cachedData) {
        console.log('Cache hit');
        return res.json(cachedData);
    }

    if (!res._headerSent) {
        const originalSend = res.send;

        res.send = (body) => {
            cache.set(key, body, 10);
            originalSend.call(res, body);
        };
    }

    next();
};

export default cacheMiddleware;
