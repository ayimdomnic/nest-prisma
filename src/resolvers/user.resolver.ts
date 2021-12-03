import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'nestjs-prisma';
import { AuthUser } from 'src/decorators/auth.user';
import { User } from 'src/dtos/user.dto';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { UserService } from 'src/services/user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'getUser' })
  async me(@AuthUser() user: User) {
    return this.prisma.user.findUnique({
      where: { id: user.id },
    });
  }
}
