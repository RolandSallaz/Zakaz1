import { IsNumber } from 'class-validator';

export class FindByIdGameDto {
  @IsNumber()
  id: number;
}
