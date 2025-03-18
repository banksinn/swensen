import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  SaveOptions,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface AbstractInterface<T> {
  find(options?: FindManyOptions<T>): Promise<T[]>;
  findBy(options?: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T[]>;
  findOne(options: FindOneOptions<T>): Promise<T | null>;
  findOneOrFail(options: FindOneOptions<T>): Promise<T>;
  findOneBy(
    options?: FindOptionsWhere<T> | FindOptionsWhere<T>[],
  ): Promise<T | null>;
  findOneByOrFail(
    options?: FindOptionsWhere<T> | FindOptionsWhere<T>[],
  ): Promise<T>;
  findOneById(id: number): Promise<T | null>;
  findOneByIdOrFail(id: number): Promise<T | null>;
  findAndCount(options: FindManyOptions<T>): Promise<[T[], number]>;
  findAndCountBy(
    options: FindOptionsWhere<T> | FindOptionsWhere<T>[],
  ): Promise<[T[], number]>;
  count(options?: FindManyOptions<T>): Promise<number>;
  create(payload: DeepPartial<T>): T;
  save(entity: T, options?: SaveOptions): Promise<T>;
  update(
    where: FindOptionsWhere<T>,
    payload: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult>;
  delete(where: FindOptionsWhere<T>): Promise<DeleteResult>;
  softDelete(where: FindOptionsWhere<T>): Promise<UpdateResult>;
  restore(where: FindOptionsWhere<T>): Promise<UpdateResult>;
}
