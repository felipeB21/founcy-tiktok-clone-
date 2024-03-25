import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserResolver } from './user/user.resolver';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      context: ({ req, res }) => ({ req, res }),
    }),
    ConfigModule.forRoot({}),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserResolver,
    UserService,
    AuthService,
    PrismaService,
    JwtService,
  ],
})
export class AppModule {}
