import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';


@ObjectType()
export abstract class BaseModel {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}


@ObjectType()
export class User extends BaseModel {
  @Field()
  fullName: string;

  @Field()
  email: string;

  @HideField()
  password: string;
}
