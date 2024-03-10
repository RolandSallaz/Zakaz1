import { IsArray, IsString } from 'class-validator';

export class CreateGameselectionDto {
  @IsString()
  name: string;

  @IsArray()
  games: number[];
}
