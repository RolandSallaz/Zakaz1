import { IsString } from 'class-validator';

export class UpdateInfoChapterDto {
  @IsString()
  heading: string;

  @IsString()
  text: string;
}
