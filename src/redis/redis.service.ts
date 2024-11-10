import { Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';

@Injectable()
export class RedisService {
  private redisClient: Redis.Redis;

  constructor() {
    // Инициализация клиента Redis
    this.redisClient = new Redis({
      host: 'localhost',
      port: 6379,
    });
  }

  // Установка ключа в Redis
  async set(key: string, value: string, ttl: number): Promise<void> {
    await this.redisClient.set(key, value, 'EX', ttl);
  }

  // Получение значения из Redis
  async get(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  // Удаление токена
  async deleteToken(key: string): Promise<void> {
    await this.redisClient.del(key); // Удаляем ключ из Redis
  }
}
