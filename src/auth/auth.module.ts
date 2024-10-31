import { Module } from '@nestjs/common'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './ user.entity';
import { JwtStrategy } from './jwt.strategy';
import { ProtectedController } from './protected.controller'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'GQ0r3QbaPQG5ETFzL8I4ux0XXbAz2yfoHI1j4V+EZN8=', 
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController, ProtectedController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}