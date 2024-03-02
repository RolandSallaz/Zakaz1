import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrFindUserDto } from './dto/createOrFind-user.dto';
import { AuthUserDto } from './dto/auth-user.dto';
import { FindUserDto } from './dto/find-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async findUserOrCreate({ email }: CreateOrFindUserDto): Promise<User> {
    let user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      user = this.userRepository.create({ email });
      await this.userRepository.save(user);
    }
    return user;
  }
  async updateAuthCode({ email, authCode }: AuthUserDto): Promise<User> {
    const user = await this.userRepository.findOneByOrFail({ email });
    user.authCode = authCode;
    await this.userRepository.save(user);
    return user;
  }

  async findUserById({ id }: FindUserDto): Promise<User> {
    const user = await this.userRepository.findOneByOrFail({ id });
    return user;
  }
}
