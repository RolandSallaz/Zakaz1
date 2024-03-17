import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UpdateInfoChapterDto } from './dto/update-info-chapter.dto';
import { InfoChaptersService } from './info-chapters.service';
import { AdminRoleAuthGuard } from '@/auth/AdminRole-auth.guard';

@Controller('info-chapters')
export class InfoChaptersController {
  constructor(private readonly infoChaptersService: InfoChaptersService) {}

  @Get(':link')
  findOne(@Param('link') link: string) {
    return this.infoChaptersService.findOne(link);
  }

  @Patch(':link')
  @UseGuards(AdminRoleAuthGuard)
  update(
    @Param('link') link: string,
    @Body() updateInfoChapterDto: UpdateInfoChapterDto,
  ) {
    return this.infoChaptersService.update(link, updateInfoChapterDto);
  }
}
