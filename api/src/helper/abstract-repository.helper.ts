import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  SaveOptions,
  UpdateResult,
} from 'typeorm';
import { AbstractInterface } from '@/helper/abstract-interface.helper';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

interface IHasId {
  id: number;
}

export abstract class AbstractRepository<T extends IHasId>
  implements AbstractInterface<T>
{
  private entity: Repository<T>;
  protected constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  public async find(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.entity.find(options);
  }

  public async findBy(
    options?: FindOptionsWhere<T> | FindOptionsWhere<T>[],
  ): Promise<T[]> {
    return await this.entity.findBy(options);
  }

  public async findOne(options: FindOneOptions<T>): Promise<T | null> {
    return await this.entity.findOne(options);
  }

  public async findOneOrFail(options: FindOneOptions<T>): Promise<T> {
    return await this.entity.findOneOrFail(options);
  }

  public async findOneBy(
    options?: FindOptionsWhere<T> | FindOptionsWhere<T>[],
  ): Promise<T | null> {
    return await this.entity.findOneBy(options);
  }

  public async findOneByOrFail(
    options?: FindOptionsWhere<T> | FindOptionsWhere<T>[],
  ): Promise<T> {
    return await this.entity.findOneByOrFail(options);
  }

  public async findOneById(id: number): Promise<T | null> {
    return await this.entity.findOneBy({ id } as FindOptionsWhere<T>);
  }

  public async findOneByIdOrFail(id: number): Promise<T | null> {
    return await this.entity.findOneByOrFail({ id } as FindOptionsWhere<T>);
  }

  public async findAndCount(
    options: FindManyOptions<T>,
  ): Promise<[T[], number]> {
    return await this.entity.findAndCount(options);
  }

  public async count(options: FindManyOptions<T>): Promise<number> {
    return await this.entity.count(options);
  }

  public async findAndCountBy(
    options: FindOptionsWhere<T> | FindOptionsWhere<T>[],
  ): Promise<[T[], number]> {
    return await this.entity.findAndCountBy(options);
  }

  public create(payload: DeepPartial<T>): T {
    return this.entity.create(payload);
  }

  public async save(entity: T, options?: SaveOptions): Promise<T> {
    return await this.entity.save(entity, options);
  }

  public async update(
    where: FindOptionsWhere<T>,
    payload: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult> {
    return await this.entity.update(where, payload);
  }

  public async delete(where: FindOptionsWhere<T>): Promise<DeleteResult> {
    return await this.entity.delete(where);
  }

  public async softDelete(where: FindOptionsWhere<T>): Promise<UpdateResult> {
    return await this.entity.softDelete(where);
  }

  public async restore(where: FindOptionsWhere<T>): Promise<UpdateResult> {
    return await this.entity.restore(where);
  }
}
