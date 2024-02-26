import { Injectable } from '@nestjs/common';
import { AuthUserDto} from './dto/auth-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async findUserOrCreate({ email }:AuthUserDto): Promise<User> {
    let user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      user = this.userRepository.create({ email });
      await this.userRepository.save(user);
    }
    return user;
  }
}
 