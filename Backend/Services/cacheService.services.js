const redisClient = require('../config/redis');

const setCache = (key, value, ttl = 60) => {
    redisClient.setex(key, ttl, JSON.stringify(value));
};

const getCache = (key) => {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, data) => {
            if (err) reject(err);
            resolve(data ? JSON.parse(data) : null);
        });
    });
};

module.exports = { setCache, getCache };
