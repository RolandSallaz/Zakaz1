import { Module } from '@nestjs/common';
import { SupportService } from './support.service';
import { SupportController } from './support.controller';
import { Support } from './entities/support.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from '@/email/email.module';

@Module({
  imports: [TypeOrmModule.forFeature([Support]), EmailModule],
  controllers: [SupportController],
  providers: [SupportService],
})
export class SupportModule {}
