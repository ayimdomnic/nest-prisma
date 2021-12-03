import { Field, HideField, ID } from '@nestjs/graphql';

export abstract class BaseModel {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export class User extends BaseModel {
  @Field()
  fullName: string;

  @Field()
  email: string;

  @HideField()
  password: string;
}
