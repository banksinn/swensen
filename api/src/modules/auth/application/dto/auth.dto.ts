import { CreateUserDto } from '@/modules/auth/user/application/dto/user.dto';
import { PickType } from '@nestjs/swagger';

export class LoginUserDto extends PickType(CreateUserDto, ['email']) {}
