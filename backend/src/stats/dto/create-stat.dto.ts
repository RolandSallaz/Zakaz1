import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateStatDto {
  @IsNumber()
  digiId: number;

  @IsString()
  action: string;
}
