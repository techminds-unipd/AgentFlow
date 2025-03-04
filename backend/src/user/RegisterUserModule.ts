import { Get, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import RegisterUserController from './adapter/input/RegisterUserController';
import RegisterUserService from './service/RegisterUserService';
import { UserEntity, UserEntitySchema } from './adapter/output/UserEntity';
import { UserRepository } from './adapter/output/UserRepository';
import UserPortAdapter from './adapter/output/UserPortAdapter';
import { GET_USER_PORT } from './service/port/output/GetUserPort';
import { REGISTER_USER_PORT } from './service/port/output/RegisterUserPort';
import { REGISTER_USER_USE_CASE } from './service/port/input/RegisterUserUseCase';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserEntitySchema }]),

  ],
  controllers: [RegisterUserController],
  providers: [{provide: REGISTER_USER_USE_CASE, useClass: RegisterUserService}, UserRepository, {provide: REGISTER_USER_PORT, useClass: UserPortAdapter}, {provide: GET_USER_PORT, useClass: UserPortAdapter}],
})
export class RegisterUserModule {}
