import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UpdateRobotDto } from './dto/update-robot.dto';
import { RobotsService } from './robots.service';
import { AdminRoleAuthGuard } from '@/auth/AdminRole-auth.guard';

@Controller('robots')
export class RobotsController {
  constructor(private readonly robotsService: RobotsService) {}

  @Get()
  @UseGuards(AdminRoleAuthGuard)
  findAll() {
    return this.robotsService.getRobots();
  }

  @Patch()
  @UseGuards(AdminRoleAuthGuard)
  update(@Body() updateRobotDto: UpdateRobotDto) {
    return this.robotsService.update(updateRobotDto);
  }
}
