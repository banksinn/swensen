import { CreateUserDto } from '@/modules/auth/user/application/dto/user.dto';
import { PartialType, PickType } from '@nestjs/swagger';

export class ValidateUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}

export class RegisterDto extends PartialType(CreateUserDto) {}
