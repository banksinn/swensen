import {
  IsOnlyDate,
  IsThaiPhoneNumber,
} from '@/decorators/validator.decorator';
import { AbstractEntity } from '@/helper/abstract-entity.helper';
import { Gender } from '@/modules/auth/user/domain/enums/user.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity, Index } from 'typeorm';
import * as argon2 from 'argon2';

@Entity()
export class User extends AbstractEntity {
  @ApiProperty({ example: 'john' })
  @IsString()
  @IsNotEmpty()
  @Column({ type: String })
  firstname: string;

  @ApiProperty({ example: 'doe' })
  @IsString()
  @IsNotEmpty()
  @Column({ type: String })
  lastname: string;

  @ApiProperty({ example: 'john_doe@yopmail.com' })
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase().trim())
  @Index()
  @Column({ type: String, unique: true })
  email: string;

  @ApiProperty({ example: 'Hello123' })
  @IsNotEmpty()
  @Exclude({ toPlainOnly: true })
  @Column({ type: String, select: false })
  password: string;

  @ApiProperty({ example: '0987654321' })
  @IsThaiPhoneNumber()
  @IsNotEmpty()
  @Column({ type: String })
  phone: string;

  @ApiProperty({ example: Gender.MALE })
  @IsEnum(Gender)
  @IsNotEmpty()
  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @ApiProperty({ example: '2025-01-01' })
  @IsOnlyDate()
  @IsNotEmpty()
  @Column({ type: 'date' })
  birthdate: string;

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.password) {
      this.password = await argon2.hash(this.password);
    }
  }
}
