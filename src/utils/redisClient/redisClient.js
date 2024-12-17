require("dotenv").config();
const redis = require("redis");

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

module.exports = redisClient;
