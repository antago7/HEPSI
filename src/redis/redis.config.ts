import { ConfigService } from '@nestjs/config';
import { RedisOptions } from 'ioredis'; 

export const redisConfig = {
  useFactory: async (configService: ConfigService): Promise<RedisOptions> => ({
    host: configService.get('REDIS_HOST', 'localhost'), 
    port: configService.get('REDIS_PORT', 6379), 
  }),
  inject: [ConfigService],
};
