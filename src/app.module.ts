//verison works

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { User } from './auth/user.entity';
import { JwtModule } from '@nestjs/jwt'; 
import { ConfigModule } from '@nestjs/config';
import { BookModule } from './booksModules/book.module'; 
import { S3Service } from './s3.service';
import { RedisService } from './redis/redis.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,  
      synchronize: true,       
    }),
    AuthModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET, 
      signOptions: { expiresIn: '1h' }, 
    }),
    BookModule, 
  ],
  controllers: [],
  providers: [AuthService, S3Service, RedisService],
})
export class AppModule {}
