import { IsNumber } from 'class-validator';

export class FindByGameIdKeyDto {
  @IsNumber()
  gameId: number;
}
