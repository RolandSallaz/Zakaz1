import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateKeyDto {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsInt()
  @IsNotEmpty()
  gameId: number; // Используем gameId вместо экземпляра Game

  @IsString()
  gameName: string;
}
