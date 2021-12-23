import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { User } from './user.dto';

@InputType()
export class RegisterInput {
  @Field(() => String)
  fullname: string;

  @Field(() => String)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @Field(() => String)
  password: string;

  @Field(() => String)
  passwordConfirm: string;
}

export interface JwtDto {
  userId: string;
  /**
   * Issued at
   */
  iat: number;
  /**
   * Expiration time
   */
  exp: number;
}

@InputType()
export class LoginInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

@ObjectType()
export class Token {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
}

@ObjectType()
export class Auth extends Token {
  user: User;
}
