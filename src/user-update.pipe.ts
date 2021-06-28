import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class UserUpdatePipe implements PipeTransform {
  transform(value: any) {
    console.log(value);
    if (!Object.keys(value).length)
      throw new HttpException(
        'please fill in one of the payloads',
        HttpStatus.BAD_REQUEST,
      );
    return value;
  }
}
