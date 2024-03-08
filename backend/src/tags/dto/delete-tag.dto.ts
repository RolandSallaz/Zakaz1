import { IsString, MinLength } from 'class-validator';

export class DeleteTagDto {
  @IsString()
  @MinLength(2)
  nameame: string;
}
