const { createClient } = require("redis");

const redisClient = createClient({
  url: 'redis://localhost:6379'
});

redisClient.on('error', (err)=> console.log('Redis Client Error', err));

(async () => {
  await redisClient.connect();
  console.log('Connected to Redis successfully');
})();

module.exports = redisClient;