import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateOrFindUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
