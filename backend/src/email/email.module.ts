import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
require('dotenv').config();
const { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_PORT, EMAIL_LOGIN } = process.env;
console.log(EMAIL_HOST, EMAIL_LOGIN, EMAIL_PASSWORD, EMAIL_PORT);
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: EMAIL_HOST,
        port: Number(EMAIL_PORT),

        auth: {
          user: EMAIL_LOGIN,
          pass: EMAIL_PASSWORD,
        },
      },
      defaults: {
        from: '"From steamland" <auth@steamland.com>',
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
