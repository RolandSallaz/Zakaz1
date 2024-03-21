import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  isNotEmpty,
} from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  id: number;

  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsString()
  info: string;

  @IsNumber()
  @IsNotEmpty()
  digiId: number;
}
