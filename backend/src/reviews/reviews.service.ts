import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: { id: createReviewDto.id },
    });
    if (review) {
      return review;
    } else {
      const newReview = this.reviewRepository.create(createReviewDto);
      return await this.reviewRepository.save(newReview);
    }
  }

  async findAll(): Promise<Review[]> {
    return await this.reviewRepository.find({
      order: {
        date: 'DESC',
      },
    });
  }

  async findManyByDigiId(digiId: number): Promise<Review[]> {
    return await this.reviewRepository.find({
      where: { digiId },
      order: {
        date: 'DESC',
      },
    });
  }

  async findRandomElements(): Promise<Review[]> {
    return await this.reviewRepository
      .createQueryBuilder('entity')
      .orderBy('RANDOM()')
      .take(10)
      .getMany();
  }
}
