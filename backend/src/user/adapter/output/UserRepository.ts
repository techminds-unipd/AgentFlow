import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from './UserEntity';

@Injectable()
export class UserRepository {
    constructor(@InjectModel(UserEntity.name) private readonly userEntityModel: Model<UserEntity>,) {}

    async getUserByUsername(username: string): Promise<UserEntity | null> {
        const user = await this.userEntityModel.findOne({ username: username });
        return user;
    }

   async registerUser(user: UserEntity): Promise<UserEntity> {
        const registeredUser = await this.userEntityModel.create(user);
        return registeredUser;
    }
}
