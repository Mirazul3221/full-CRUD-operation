import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { user_model, user_schema } from './Schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { jwtStrategy } from './jwt.stratigy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy:"jwt"
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('jwt_secret'),
          signOptions: {
            expiresIn: config.get<string | number>('jwt_exp'),
          },
        };
      },
    }),
    MongooseModule.forFeature([
      {
        name: user_model,
        schema: user_schema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService,jwtStrategy],
  exports : [jwtStrategy, PassportModule]
})
export class AuthModule {}
//gtx
