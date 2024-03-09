import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSliderDto {
  @IsNumber()
  @IsNotEmpty()
  gameId;
}
