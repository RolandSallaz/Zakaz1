import { AuthUserDto } from '@/users/dto/auth-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

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
        // ✏️ filling curly brackets with content
        authCode,
      },
    });
  }
}
