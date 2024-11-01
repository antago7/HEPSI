import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('auth_users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}