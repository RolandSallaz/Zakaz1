import { Inject, Injectable } from '@nestjs/common';
import { CreateSupportDto } from './dto/create-support.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Support } from './entities/support.entity';
import { Repository } from 'typeorm';
import { EmailService } from '@/email/email.service';

@Injectable()
export class SupportService {
  constructor(
    @InjectRepository(Support)
    private supportRepository: Repository<Support>,
    @Inject(EmailService)
    private emailService: EmailService,
  ) {}

  async create(
    createSupportDto: CreateSupportDto,
  ): Promise<{ message: string }> {
    const support = await this.supportRepository.save({ ...createSupportDto });
    await this.emailService.sendSupportTickerToUser(createSupportDto.email);
    await this.emailService.sendSupportTickerToAdmin(support);
    return { message: 'Заявка успешно отправлена' };
  }
}
