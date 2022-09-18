import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/userSchema';
import {JwtModule} from '@nestjs/jwt'
import { JwtStrategy } from './strategy/jwt.strategy';


@Module({
  imports:[JwtModule.register({
     secret:'super-secret'
  }) ,MongooseModule.forFeature([
    {name:'Users',schema:UserSchema}
  ])],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
