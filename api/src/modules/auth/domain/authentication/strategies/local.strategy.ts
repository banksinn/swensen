import { AuthService } from '@/modules/auth/domain/services/auth.service';
import { User } from '@/modules/auth/user/domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

export interface LocalPayload extends User {}

export interface LocalRequest extends Request {
  user: LocalPayload;
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validateUser({
      email: email.toLowerCase(),
      password,
    });
    return user;
  }
}
