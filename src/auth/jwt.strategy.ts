import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'GQ0r3QbaPQG5ETFzL8I4ux0XXbAz2yfoHI1j4V+EZN8=', 
    });
  }

  async validate(payload: { username: string }) {
    return { username: payload.username };
  }
}