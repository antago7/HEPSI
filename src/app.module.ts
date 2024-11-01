import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { User } from './auth/user.entity';
import { JwtModule } from '@nestjs/jwt'; 
import { ConfigModule } from '@nestjs/config';

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
      secret: 'GQ0r3QbaPQG5ETFzL8I4ux0XXbAz2yfoHI1j4V+EZN8=', 
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  providers: [AuthService],
})
export class AppModule {}
