import { PartialType } from '@nestjs/mapped-types';
import { CreateGameselectionDto } from './create-gameselection.dto';

export class UpdateGameselectionDto extends PartialType(CreateGameselectionDto) {}
