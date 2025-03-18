import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ApiProperty } from '@nestjs/swagger';

export class IResponse<T> {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  path: string;
  @ApiProperty()
  duration: string;

  data: T;
}

@Injectable()
export class TransformationInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse<T>> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const response = httpContext.getResponse();

    Logger.log(
      `API Request - Method: ${request.method}, Path: ${request.url}`,
      'TransformationInterceptor',
    );

    return next.handle().pipe(
      map((data) => ({
        statusCode: response.statusCode,
        path: request.path,
        duration: `${Date.now() - now}ms`,
        data: data,
      })),
    );
  }
}
