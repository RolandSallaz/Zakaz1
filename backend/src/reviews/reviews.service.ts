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

  async createIfNotExisr(createReviewDto: CreateReviewDto): Promise<Review> {
    try {
      const newReview = this.reviewRepository.create(createReviewDto);
      return await this.reviewRepository.save(newReview);
    } catch (error) {
      if (error.code === '23505') {
        const review = await this.reviewRepository.findOneOrFail({
          where: { id: createReviewDto.id },
        });
        return review;
      }
      throw error;
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
