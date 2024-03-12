import { Controller, Get } from '@nestjs/common';
import { DigiService } from './digi.service';

@Controller('digi')
export class DigiController {
  constructor(private readonly digiService: DigiService) {}

  @Get('lastSales')
  sales() {
    return this.digiService.getLastSales();
  }
}
