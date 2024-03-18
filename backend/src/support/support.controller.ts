import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateSupportDto } from './dto/create-support.dto';
import { SupportService } from './support.service';

@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Post()
  @HttpCode(200)
  create(@Body() createSupportDto: CreateSupportDto) {
    return this.supportService.create(createSupportDto);
  }
}
