import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
require('dotenv').config();
const { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_PORT, EMAIL_LOGIN } = process.env; //todo
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: EMAIL_HOST,
        port: Number(EMAIL_PORT),
        secure: true, // true for 465, false for other ports
        auth: {
          user: EMAIL_LOGIN, // generated ethereal user
          pass: EMAIL_PASSWORD, // generated ethereal password
        },
      },
      defaults: {
        from: '"No Reply" <skystoremessage@yandex.ru>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
