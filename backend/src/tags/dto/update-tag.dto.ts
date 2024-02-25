import { PartialType } from '@nestjs/mapped-types';
import { CreateTagDto } from './create-tag.dto';
import { MinLength, IsString } from 'class-validator';

export class UpdateTagDto extends PartialType(CreateTagDto) {
    @IsString()
    @MinLength(2)
    name: string;
}
