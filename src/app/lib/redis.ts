import Redis from 'ioredis';
import config from '../config';

export const redis = new Redis({
    host: config.redis_host,
    port: Number(config.redis_port),
    password: config.redis_password,
    tls: {}
})