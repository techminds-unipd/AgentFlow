import User from "src/user/domain/User";
import { UserRepository } from "./UserRepository";
import GetUserPort from "src/user/service/port/output/GetUserPort";
import RegisterUserPort from "src/user/service/port/output/RegisterUserPort";
import { Injectable } from "@nestjs/common";
import { UserEntity } from "./UserEntity";

@Injectable()
class UserPortAdapter implements GetUserPort, RegisterUserPort {

    constructor(private readonly userRepository: UserRepository) {}

    private toDomain(userEntity: UserEntity): User {
        return new User(userEntity.username, userEntity.password);
    }

    private toEntity(user: User): UserEntity {
        return {
            username: user.username,
            password: user.password,
            workflows: []
        };
    }

    async getUserByUsername(username: string): Promise<User> {
        const user = await this.userRepository.getUserByUsername(username);
        return this.toDomain(user);
    }

    async registerUser(user: User): Promise<User> {
        const newUser = this.toEntity(user);
        const registeredUser = await this.userRepository.registerUser(newUser);
        return this.toDomain(registeredUser);
    }
}


export default UserPortAdapter;