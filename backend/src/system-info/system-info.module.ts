import { Module } from '@nestjs/common';
import { SystemInfoGateway } from './system-info.gateway';

@Module({
  providers: [SystemInfoGateway],
})
export class SystemInfoModule {}
