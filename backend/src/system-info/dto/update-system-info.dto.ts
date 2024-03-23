import { PartialType } from '@nestjs/mapped-types';
import { CreateSystemInfoDto } from './create-system-info.dto';

export class UpdateSystemInfoDto extends PartialType(CreateSystemInfoDto) {
  id: number;
}
