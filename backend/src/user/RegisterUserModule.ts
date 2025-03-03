import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import RegisterUserController from './adapter/in/RegisterUserController';
import RegisterUserService from './service/RegisterUserService';
import { UserEntity, UserEntitySchema } from './adapter/out/UserEntity';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserEntitySchema }]),
  ],
  controllers: [RegisterUserController],
  providers: [RegisterUserService],
})
export class RegisterUserModule {}
