import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { PrismaService } from './services/prisma.service';
import { PrismaModule } from 'nestjs-prisma'
import { ConfigModule } from '@nestjs/config';
import config from './config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      buildSchemaOptions: { dateScalarMode: 'timestamp'},
      playground: true,
      context: ({ req }) => ({ req }),
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
