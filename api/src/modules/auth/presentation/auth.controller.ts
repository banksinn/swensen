import { Public } from '@/decorators/public-route.decorator';
import {
  RegisterDto,
  ValidateUserDto,
} from '@/modules/auth/application/dto/auth.dto';
import { LocalGuard } from '@/modules/auth/domain/authentication/guards/local.guard';
import { JwtToken } from '@/modules/auth/domain/authentication/strategies/jwt.strategy';
import { LocalRequest } from '@/modules/auth/domain/authentication/strategies/local.strategy';
import { AuthService } from '@/modules/auth/domain/services/auth.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Public()
  @UseGuards(LocalGuard)
  @ApiBody({ type: ValidateUserDto })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: JwtToken })
  @ApiUnauthorizedResponse({
    description: 'Password is not correct',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  login(@Req() req: LocalRequest): JwtToken {
    const jwtpayload = {
      id: req.user.id,
    };
    return {
      token: this.jwtService.sign(jwtpayload, { expiresIn: '30d' }),
    };
  }

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: JwtToken })
  @ApiBadRequestResponse({ description: 'User already exists' })
  async register(@Body() data: RegisterDto): Promise<JwtToken> {
    return this.authService.register(data);
  }
}
