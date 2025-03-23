import { UserRepository } from '@/modules/auth/user/infrastructure/repositories/user.repository';
import { JwtAuthRequest } from '@/modules/auth/domain/authentication/strategies/jwt.strategy';
import { User } from '@/modules/auth/user/domain/entities/user.entity';
import { UserService } from '@/modules/auth/user/domain/services/user.service';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from '@/modules/auth/user/application/dto/user.dto';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
  ) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  async userMe(@Req() req: JwtAuthRequest): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: req.user.id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
