import { createClient } from 'redis';
import { config } from 'dotenv';
config();

const { REDIS_URL, REDIS_PWD } = process.env;
export const redisClient = createClient({
  url: REDIS_URL,
  password: REDIS_PWD,
  port: 6379,
  host: '27.0.0.1',
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Client connected'));
(async () => {
  await redisClient.connect();
})();

export const setToken = async (key, value) => await redisClient.set(key, value);
export const deleteToken = async (key) => await redisClient.del(key);
export const getToken = async (key) => await redisClient.get(key);

export default redisClient;
