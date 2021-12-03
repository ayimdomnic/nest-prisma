import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Auth, LoginInput, RegisterInput, Token } from 'src/dtos/auth.dto';
import { User } from 'src/dtos/user.dto';
import { AuthService } from 'src/services/auth.service';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation(() => Auth)
  async register(@Args('input') input: RegisterInput) {
    const { accessToken, refreshToken } = await this.auth.createUser(input);

    return {
      accessToken,
      refreshToken,
    };
  }

  @Mutation(() => Auth)
  async login(@Args('input') input: LoginInput) {
    const { accessToken, refreshToken } = await this.auth.login(input);

    return {
      accessToken,
      refreshToken,
    };
  }


  @Mutation(() => Token)
  async refreshToken(@Args('refreshToken') token: string) {
    const { accessToken, refreshToken } = await this.auth.refreshToken(token);

    return {
      accessToken,
      refreshToken
    };
  }
}
