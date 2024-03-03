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

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  logo: string;

  @IsArray()
  screenshots: string[];

  @IsArray()
  tags: [{ name: string }];

  @IsNumber()
  price: number;

  @IsNumber()
  discount: number;

  @IsBoolean()
  enabled?: boolean;

  @IsArray()
  keys?: string[];
}
