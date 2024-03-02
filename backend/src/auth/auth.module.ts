import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { EmailService } from 'src/email/email.service';
import { EmailModule } from 'src/email/email.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';
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
  controllers: [AuthController]
})
export class AuthModule {}
