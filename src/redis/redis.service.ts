import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private redisClient: Redis;

  constructor() {
    this.redisClient = new Redis({
      host: 'localhost',
      port: 6379,
      password: 'your_password',
      db: 0,
    });
  }

  // Метод для установки токена
  async set(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
  }

  // Метод для получения токена
  async get(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  // Метод для удаления токена
  async delete(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
}
