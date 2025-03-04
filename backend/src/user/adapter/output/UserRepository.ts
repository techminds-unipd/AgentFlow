import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from './UserEntity';


@Injectable()
export class UserRepository {

    constructor(@InjectModel(UserEntity.name) private readonly userEntityModel: Model<UserEntity>,) {}

    async getUserByUsername(username: string): Promise<UserEntity> {
        const user = await this.userEntityModel.findOne({ username: username }).exec();
        if (!user) {
            throw new Error('User not found');
        }
        return user as UserEntity;
    }

    async checkUserExists(username: string): Promise<boolean> {
        const user = await this.userEntityModel.findOne({ username: username }).exec();
        if (user) {
            return true;
        }
        return false;
    }

    async registerUser(user: UserEntity): Promise<UserEntity> {
        const newUser = new this.userEntityModel(user);
        return newUser.save();
    }
}
