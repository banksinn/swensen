import { validate } from '@/utils/env.validation';
import { registerAs } from '@nestjs/config';
import { IsNotEmpty, IsString } from 'class-validator';

class EnvironmentVariablesValidator {
  @IsString()
  @IsNotEmpty()
  DB_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  DB_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  DB_HOST: string;

  @IsString()
  @IsNotEmpty()
  DB_PORT: string;

  @IsString()
  @IsNotEmpty()
  DB_DATABASE: string;
}

export default registerAs('database', () => {
  validate(process.env, EnvironmentVariablesValidator);
  return {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    database: process.env.DB_DATABASE,
  };
});
