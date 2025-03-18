import { validate } from '@/utils/env.validation';
import { registerAs } from '@nestjs/config';
import { IsNotEmpty, IsString } from 'class-validator';

class EnvironmentVariablesValidator {
  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;
}

export default registerAs('auth', () => {
  validate(process.env, EnvironmentVariablesValidator);
  return {
    secret: process.env.JWT_SECRET,
  };
});
