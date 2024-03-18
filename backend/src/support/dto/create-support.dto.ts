import { IsEmail, IsString, Max } from 'class-validator';

export class CreateSupportDto {
  @IsString()
  shortDescription: string;

  @IsEmail()
  email: string;

  @IsString()
  imageLink: string;

  @IsString()
  trouble: string;
}
