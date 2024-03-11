import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty()
  @IsNumber()
  steamId: number;

  @IsArray()
  tags: [{ name: string }];

  @IsNumber()
  digiId: number;
}
