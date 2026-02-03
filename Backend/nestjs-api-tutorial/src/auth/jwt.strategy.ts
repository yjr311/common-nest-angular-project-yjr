import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 默认 Authorization: Bearer <token>
      //jwtFromRequest: ExtractJwt.fromHeader('x-access-token'), // 自定义字段名而且不用前缀Bearer了
      secretOrKey: 'dev_secret_123',
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role
    };
  }
}
