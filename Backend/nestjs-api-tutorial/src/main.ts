import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,       // 自动剔除 DTO 没有的字段
    forbidNonWhitelisted: true, // 如果传了 DTO 没定义的字段，报错
    transform: true,       // 自动把请求的类型转换成 DTO 中定义的类型
  }));
  await app.listen(process.env.PORT ?? 3333);


}
bootstrap();
