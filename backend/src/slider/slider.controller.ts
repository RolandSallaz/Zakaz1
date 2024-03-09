import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SliderService } from './slider.service';
import { CreateSliderDto } from './dto/create-slider.dto';
import { UpdateSliderDto } from './dto/update-slider.dto';
import { AdminRoleAuthGuard } from '@/auth/AdminRole-auth.guard';

@Controller('slider')
export class SliderController {
  constructor(private readonly sliderService: SliderService) {}

  @Post()
  @UseGuards(AdminRoleAuthGuard)
  create(@Body() createSliderDto: CreateSliderDto) {
    return this.sliderService.create(createSliderDto);
  }

  @Get()
  findAll() {
    return this.sliderService.findAll();
  }

  @Get(':id')
  @UseGuards(AdminRoleAuthGuard)
  findOne(@Param('id') id: string) {
    return this.sliderService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AdminRoleAuthGuard)
  update(@Param('id') id: string, @Body() updateSliderDto: UpdateSliderDto) {
    return this.sliderService.update(+id, updateSliderDto);
  }

  @Delete(':id')
  @UseGuards(AdminRoleAuthGuard)
  remove(@Param('id') id: string) {
    return this.sliderService.remove(+id);
  }
}
