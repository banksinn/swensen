import { UserRepository } from '@/modules/auth/user/infrastructure/repositories/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
}
