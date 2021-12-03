import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { User } from "./user.dto";

@InputType()
export class RegisterInput {
    @Field(() => String)
    fullName: string

    @Field(() => String)
    email: string

    @Field(() => String)
    password: string

    @Field(() => String)
    passwordConfirm: string
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
    email: string

    @Field(() => String)
    password: string
}

@ObjectType()
export class Token {
    @Field(() => String)
    accessToken: string

    @Field(() => String)
    refreshToken: string
}

@ObjectType()
export class Auth extends Token {
    user: User 
}

