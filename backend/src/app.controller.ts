import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  //сделать авторизацию
  @Get()
  getHello(): string {
    return 'test'
  }
}
