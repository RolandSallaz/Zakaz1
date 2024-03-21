import { Controller, Get, Param } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  getAll() {
    return this.reviewsService.findAll();
  }

  @Get('random')
  getRandomReviews() {
    return this.reviewsService.findRandomElements();
  }

  @Get(':digi')
  getReviews(@Param('digi') digi: number) {
    return this.reviewsService.findManyByDigiId(digi);
  }
}
