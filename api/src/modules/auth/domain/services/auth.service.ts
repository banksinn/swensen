import {
  RegisterDto,
  ValidateUserDto,
} from '@/modules/auth/application/dto/auth.dto';
import { JwtToken } from '@/modules/auth/domain/authentication/strategies/jwt.strategy';
import { User } from '@/modules/auth/user/domain/entities/user.entity';
import { UserService } from '@/modules/auth/user/domain/services/user.service';
import { UserRepository } from '@/modules/auth/user/infrastructure/repositories/user.repository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(data: ValidateUserDto): Promise<User> {
    const user = await this.userRepository.findOneWithPassword(data.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isMatched = await argon2.verify(user.password, data.password);
    if (!isMatched) {
      throw new UnauthorizedException('Password is not correct');
    }
    return user;
  }

  async register(payload: RegisterDto): Promise<JwtToken> {
    const exist = await this.userRepository.findOne({
      where: { email: payload.email },
    });
    if (exist) {
      throw new BadRequestException('User already exists');
    }
    const createdUser = this.userRepository.create(payload);
    const result = await this.userRepository.save(createdUser);
    const jwtpayload = {
      id: result.id,
    };
    return {
      token: this.jwtService.sign(jwtpayload, { expiresIn: '30d' }),
    };
  }
}
