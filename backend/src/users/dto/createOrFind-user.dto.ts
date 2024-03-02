import { PickType } from '@nestjs/mapped-types';
import { PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../entities/user.entity';
import { IsEmail, IsNumber } from 'class-validator';

export class CreateOrFindUserDto  {
    @IsEmail()
    email: string;
}
