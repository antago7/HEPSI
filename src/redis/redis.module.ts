import { Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';

@Injectable()
export class RedisService {
  private redisClient: Redis.Redis;

  constructor() {
    // Используем правильный способ создания клиента
    this.redisClient = new Redis({
      host: 'localhost', // Укажите хост Redis
      port: 6379,        // Порт Redis
      password: 'your_password', // Если требуется пароль
      db: 0,             // Индекс базы данных Redis
    });
  }

  // Пример метода для установки данных в Redis
  async set(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
  }

  // Пример метода для получения данных из Redis
  async get(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }
}
