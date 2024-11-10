import { Controller, Post, Body, Get, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';
import { RedisService } from '../redis/redis.service'; // Импортируем RedisService

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly redisService: RedisService, // Внедряем RedisService
  ) {}

  @Get() // Обработка GET-запроса на /auth
  async getAuthInfo() {
    return { message: "Auth routes available", routes: ['signup', 'signin', 'users'] };
  }

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.authService.signUp(createUserDto.username, createUserDto.password);
  }

  @Post('signin')
  async signIn(@Body() createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
    // Вход пользователя и получение токена
    const { accessToken } = await this.authService.signIn(createUserDto.username, createUserDto.password);

    // Получаем пользователя по имени
    const user = await this.authService.findUserByUsername(createUserDto.username);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Сохраняем токен в Redis с временем жизни 1 час
    await this.redisService.setToken(user.id.toString(), accessToken, 3600);  // Время жизни токена в секундах

    return { accessToken };
  }

  @Get('users')
  async getAllUsers(): Promise<User[]> {
    try {
      return await this.authService.findAllUsers();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  // Новый endpoint для выхода (удаления токена из Redis)
  @Post('logout')
  async logout(@Body() createUserDto: CreateUserDto): Promise<{ message: string }> {
    // Получаем пользователя по имени
    const user = await this.authService.findUserByUsername(createUserDto.username);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Удаляем токен из Redis
    await this.redisService.deleteToken(user.id.toString());

    return { message: 'Logged out successfully' };
  }
}
