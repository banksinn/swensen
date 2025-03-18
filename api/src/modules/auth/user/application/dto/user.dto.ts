import { User } from '@/modules/auth/user/domain/entities/user.entity';
import { OmitType, PartialType } from '@nestjs/swagger';

export class UserDto extends PartialType(User) {}

export class CreateUserDto extends OmitType(User, [
  'id',
  'createdAt',
  'updatedAt',
  'deletedAt',
]) {}

export class UpdateUserDto extends OmitType(User, [
  'id',
  'createdAt',
  'updatedAt',
  'deletedAt',
]) {}
