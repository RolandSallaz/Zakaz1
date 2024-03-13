import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty()
  @IsNumber()
  steamId: number;

  @IsOptional()
  @IsArray()
  tags: { name: string }[];

  @IsNumber()
  digiId: number;
}
