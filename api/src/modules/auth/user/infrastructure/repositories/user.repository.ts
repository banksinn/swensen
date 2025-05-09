import { AbstractInterface } from '@/helper/abstract-interface.helper';
import { AbstractRepository } from '@/helper/abstract-repository.helper';
import { User } from '@/modules/auth/user/domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository
  extends AbstractRepository<User>
  implements AbstractInterface<User>
{
  constructor(
    @InjectRepository(User) public readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async findOneWithPassword(email: string): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
    return user;
  }
}
