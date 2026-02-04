import { Global, Module } from '@nestjs/common';
import { UserContext } from './services/user-context.service';

@Global()
@Module({
  providers: [UserContext],
  exports: [UserContext],
})
export class UserContextModule {}