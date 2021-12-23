import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { PrismaModule } from 'nestjs-prisma';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config';
import { AuthService } from './services/auth.service';
import { PasswordService } from './services/password.service';
import { AuthResolver } from './resolvers/auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { SecurityConfig } from './types';
import { JwtStrategy } from './strategy/jwt.strategy';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { AppResolver } from './app.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { UserService } from './services/user.service';
import { RequestService } from './services/request.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const securityConfig = configService.get<SecurityConfig>('security');
        return {
          secret: configService.get<string>('JWT_ACCESS_SECRET'),
          signOptions: {
            expiresIn: securityConfig.expiresIn,
          },
        };
      },
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppResolver,
    RequestService,
    AuthService,
    UserResolver,
    UserService,
    PasswordService,
    AuthResolver,
    JwtStrategy,
    GqlAuthGuard,
  ],
})
export class AppModule {}
