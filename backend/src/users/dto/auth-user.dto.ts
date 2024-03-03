import { IsEmail, IsNotEmpty, IsNumber, Validate } from 'class-validator';

function isValidAuthCode(value: number): boolean {
  const authCodeString = value.toString();
  return /^\d{6}$/.test(authCodeString);
}

export class AuthUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @Validate(isValidAuthCode, {
    message: 'Field "authCode" must be a 6-digit number.',
  })
  authCode: number;
}
