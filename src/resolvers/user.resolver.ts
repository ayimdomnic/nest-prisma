import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'nestjs-prisma';
import { AuthUser } from 'src/decorators/auth.user';
import { RequestResult, SendRequestInput } from 'src/dtos/request.dto';
import { User } from '@prisma/client';
import { User as UserResult } from '../dtos/user.dto';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { RequestService } from 'src/services/request.service';
import { UserService } from 'src/services/user.service';

@Resolver(() => UserResult)
export class UserResolver {
  constructor(
    private userService: UserService,
    private readonly requestService: RequestService,
    private prisma: PrismaService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => UserResult, { name: 'getUser' })
  async me(@AuthUser() user: User) {
    return this.userService.getUser(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => RequestResult)
  async sendFriendRequest(
    @AuthUser() user: User,
    @Args('input') input: SendRequestInput,
  ) {
    return this.requestService.sendRequest(user, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => RequestResult, { name: 'acceptOrDeclineRequest' })
  async acceptOrDeclineRequest(
    @AuthUser() user: User,
    @Args('requestId') requestId: string,
    @Args('status') status: string,
  ) {
    return this.requestService.acceptRequest(user, requestId, status);
  }
}
