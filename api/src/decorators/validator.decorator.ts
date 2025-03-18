import {
  ValidateIf,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export const IsNullable = () => ValidateIf((obj, value) => value !== null);

export function IsThaiPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsThaiPhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: 'The phone number starts with 0 and has exactly 10 digits',
        ...validationOptions,
      },
      validator: {
        validate(value: string) {
          const thaiPhoneNumberRegex = /^0\d{9}$/;
          return thaiPhoneNumberRegex.test(value) && typeof value === 'string';
        },
      },
    });
  };
}

export function IsOnlyYear(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsOnlyYear',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: 'Please provide only date like 2020',
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          const yearRegex = /^([12]\d{3})$/;
          return yearRegex.test(value) && typeof value === 'string';
        },
      },
    });
  };
}

export function IsOnlyMonth(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsOnlyMonth',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: 'Please provide only date like 2020-12',
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          const monthRegex = /^([12]\d{3})\-(0[1-9]|1[0-2])$/;
          return monthRegex.test(value) && typeof value === 'string';
        },
      },
    });
  };
}

export function IsOnlyDate(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsOnlyDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: 'Please provide only date like 2020-12-08',
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          const dateRegex =
            /^([12]\d{3})\-(0[1-9]|1[0-2])\-(0[1-9]|[12]\d|3[01])$/;
          return dateRegex.test(value) && typeof value === 'string';
        },
      },
    });
  };
}

export function IsOnlyTime(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsOnlyTime',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: 'Please provide only time like 12:00:00',
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          const timeRegex = /^([0-1][0-9]|2[0-3])\:([0-5][0-9])\:([0-5][0-9])$/;
          return timeRegex.test(value) && typeof value === 'string';
        },
      },
    });
  };
}
