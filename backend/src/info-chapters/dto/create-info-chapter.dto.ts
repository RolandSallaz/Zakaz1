import { IsString } from 'class-validator';

export class CreateInfoChapterDto {
  @IsString()
  heading: string;

  @IsString()
  text: string;

  @IsString()
  link: string;
}
