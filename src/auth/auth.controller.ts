import { Controller, Post, Body, Get } from '@nestjs/common'; 
import { AuthService } from './auth.service'; 
import { CreateUserDto } from './create-user.dto'; 
import { User } from './user.entity'; 

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get() // Обработка GET-запроса на /auth
  async getAuthInfo() {
    return { message: "Auth routes available", routes: ['signup', 'signin', 'users'] };
  }

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.authService.signUp(createUserDto.username, createUserDto.password);
  }

  @Post('signin')
  signIn(@Body() createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(createUserDto.username, createUserDto.password);
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
}