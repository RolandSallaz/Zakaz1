import { IsString } from 'class-validator';

export class UpdateRobotDto {
  @IsString()
  text: string;
}
