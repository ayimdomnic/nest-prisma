import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class SendRequestInput {
  @Field(() => String)
  userId: string;
}

@ObjectType()
export class RequestResult {
    @Field(() => String)
    id: string;

    @Field(() => String)
    userId: string;

    @Field(() => String)
    requesterId: string;

    @Field(() => String)
    status: string;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date, { nullable: true })
    updatedAt: Date;
}