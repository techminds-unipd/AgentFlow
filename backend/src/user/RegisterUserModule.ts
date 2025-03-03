import { Get, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import RegisterUserController from './adapter/in/RegisterUserController';
import RegisterUserService from './service/RegisterUserService';
import { UserEntity, UserEntitySchema } from './adapter/out/UserEntity';
import { UserRepository } from './adapter/out/UserRepository';
import UserPortAdapter from './adapter/out/UserPortAdapter';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserEntitySchema }]),
  ],
  controllers: [RegisterUserController],
  providers: [UserRepository, 
    { provide: 'GetUserPort', useClass: UserPortAdapter }, { provide: 'RegisterUserPort', useClass: UserPortAdapter }, { provide: 'RegisterUserUseCase', useClass: RegisterUserService }],
})
export class RegisterUserModule {}
