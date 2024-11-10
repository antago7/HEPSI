import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RedisService } from 'src/redis/redis.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly redisService: RedisService,
  ) {}

  @Post('signup')
  async signUp(@Body() createUserDto: { username: string, password: string }): Promise<User> {
    return this.authService.signUp(createUserDto.username, createUserDto.password);
  }

  @Post('signin')
  async signIn(@Body() credentials: { username: string, password: string }) {
    return this.authService.signIn(credentials.username, credentials.password);
  }

  @Get('users')
  async findAllUsers(): Promise<User[]> {
    return this.authService.findAllUsers();
  }

  @Get('user/:username')
  async findUserByUsername(@Param('username') username: string) {
    return this.authService.findUserByUsername(username);
  }

  @Delete('logout/:userId')
  async logout(@Param('userId') userId: string) {
    await this.redisService.delete(userId); // Удаляем токен из Redis
    return { message: 'Logged out successfully' };
  }
}
