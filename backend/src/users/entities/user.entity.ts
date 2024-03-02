import { IsEmail } from 'class-validator';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ type: 'jsonb', array: true, default: [] })
  orders: any[];

  @Column({ nullable: true })
  authCode: number;
}