import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { RedisService } from '../redis/redis.service'; 

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService, // Внедряем RedisService
  ) {}

  // Реализация метода для поиска пользователя по имени
  async findUserByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async signUp(username: string, password: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ username, password: hashedPassword });
    await this.userRepository.save(user);
  }

  // Метод для авторизации пользователя
  async signIn(username: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (user && await bcrypt.compare(password, user.password)) {
      const payload = { username };
      const accessToken = this.jwtService.sign(payload);

      // Сохраняем токен в Redis с временем жизни 1 час (3600 секунд)
      await this.redisService.setToken(user.id.toString(), accessToken, 3600);

      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  // Метод для получения всех пользователей
  async findAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    console.log('users found:', users);
    return users; 
  }

  // Метод для проверки токена в Redis
  async validateToken(userId: string, token: string): Promise<boolean> {
    const storedToken = await this.redisService.getToken(userId);
    if (storedToken === token) {
      return true;
    }
    return false;
  }
}
