import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from 'src/email/email.module';
import { EmailService } from 'src/email/email.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
require('dotenv').config();
@Module({
  imports: [
    UsersModule,
    EmailModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'jwt_secret',
      signOptions: { expiresIn: '60d' },
    }),
  ],
  providers: [AuthService, EmailService],
  controllers: [AuthController],
})
export class AuthModule {}
