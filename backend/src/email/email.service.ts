import { Support } from '@/support/entities/support.entity';
import { AuthUserDto } from '@/users/dto/auth-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, Injectable } from '@nestjs/common';
require('dotenv').config();

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmailAuthCode({ email, authCode }: AuthUserDto) {
    const subject = `Ваш 6 значный код для входа:`;

    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './verify-code',
      context: {
        authCode,
      },
    });
  }

  async sendSupportTickerToUser(email: string) {
    const subject = 'Заявка в поддержку STEAMLAND.RU';
    return await this.mailerService.sendMail({
      to: email,
      subject,
      template: './user-support',
    });
  }

  async sendSupportTickerToAdmin(ticked: Support) {
    const adminEmail = process.env.ADMIN_EMAIL;
    const domain = process.env.DOMAIN;
    const subject = `Поступила заявка в поддерку, номер заявки ${ticked.id}`;

    return await this.mailerService.sendMail({
      to: adminEmail,
      subject,
      template: './admin-support',
      context: {
        ...ticked,
        domain,
      },
    });
  }
}
