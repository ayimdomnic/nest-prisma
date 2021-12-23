import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
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

  @Field()
  status: string;

  @HideField()
  password: string;
}
