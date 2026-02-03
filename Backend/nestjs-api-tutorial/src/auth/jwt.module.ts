import { JwtModule } from '@nestjs/jwt';

JwtModule.register({
  global: true,
  secret: 'dev_secret_123', // 企业放 env
  signOptions: { expiresIn: '2h' },
});
