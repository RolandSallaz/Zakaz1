import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteKeyDto {
  @IsString()
  @IsNotEmpty()
  key: string;
}
