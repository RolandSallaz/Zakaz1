import { Controller, Get, Param } from '@nestjs/common';
import { DigiService } from './digi.service';

@Controller('digi')
export class DigiController {
  constructor(private readonly digiService: DigiService) {}

  @Get('lastSales')
  sales() {
    return this.digiService.getLastSales();
  }

  @Get(':digiId')
  checkStock(@Param('digiId') digiId: number) {
    return this.digiService.checkStock(digiId);
  }
}
