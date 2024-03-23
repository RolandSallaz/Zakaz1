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

  async createIfNotExisr(createReviewDto: CreateReviewDto): Promise<boolean> {
    try {
      const newReview = this.reviewRepository.create(createReviewDto);
      await this.reviewRepository.save(newReview);
      return true;
    } catch (error) {
      if (error.code === '23505') {
        return false;
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
