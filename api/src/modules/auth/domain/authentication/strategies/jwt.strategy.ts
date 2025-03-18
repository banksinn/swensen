import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ApiProperty } from '@nestjs/swagger';
import { AllConfig } from '@/config/config.type';

export interface JwtAuthPayload {
  id: number;
  iat: number;
  exp: number;
}

export interface JwtAuthRequest extends Request {
  user: JwtAuthPayload;
}

export class JwtToken {
  @ApiProperty()
  token: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService<AllConfig>) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: config.get('auth.secret', { infer: true }),
    });
  }

  validate(payload: JwtAuthPayload): JwtAuthPayload {
    const { id, iat, exp } = payload;
    return {
      id,
      iat,
      exp,
    };
  }
}
