import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

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
