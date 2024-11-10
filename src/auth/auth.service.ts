import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs'; 
import { RedisService } from 'src/redis/redis.service'; 

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  // Метод регистрации пользователя
  async signUp(username: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ username, password: hashedPassword });
    return this.userRepository.save(user);
  }

  // Метод поиска пользователя по имени
  async findUserByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  // Метод для авторизации пользователя
  async signIn(username: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.findUserByUsername(username);

    if (user && await bcrypt.compare(password, user.password)) {
      const payload = { username };
      const accessToken = this.jwtService.sign(payload);

      await this.redisService.set(user.id.toString(), accessToken);

      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  // Метод для получения всех пользователей
  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
