import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { generateSixDigitCode } from 'src/common/filters/helpers/codeGenerator';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}


  async sendEmailAuthCode({email}: AuthUserDto) {
    const subject = `Ваш 6 значный код для входа:`;
    const code = generateSixDigitCode();
    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './verify-code',
      context: { // ✏️ filling curly brackets with content
        code
      },
    })
  }
}
