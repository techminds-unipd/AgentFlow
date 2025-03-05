import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Model } from "mongoose";
import { UserEntity } from "src/user/adapter/output/UserEntity";
import { UserRepository } from "src/user/adapter/output/UserRepository";


describe('UserRepository', () => {
    let userRepository: UserRepository;
    let userEntityModelMock: Model<UserEntity>;

    const userEntityMock = {
        _id: '1',
        username: 'test',
        password: 'test',
        workflows: [],
        __v: '0'
    };

    const mongoDbMock = {
        findOne: jest.fn(),
        create: jest.fn(),
    };
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserRepository,
                {
                    provide: getModelToken(UserEntity.name),
                    useValue: mongoDbMock,
                },
            ],
        }).compile();

        userRepository = module.get<UserRepository>(UserRepository);
        userEntityModelMock = module.get<Model<UserEntity>>(getModelToken(UserEntity.name));
    });


    describe('getUserByUsername', () => {
        it('should return a user', async () => {
            jest.spyOn(userEntityModelMock, 'findOne').mockResolvedValue(userEntityMock);
            const result = await userRepository.getUserByUsername(userEntityMock.username);
            expect(result).toEqual(userEntityMock as UserEntity);
        });
    });

    /*
    describe('registerUser', () => {
        it('should return the registered user', async () => {
            jest.spyOn(userEntityModelMock, 'create').mockResolvedValue(userEntityMock);
            const result = await userRepository.registerUser({username: 'test', password: 'test', workflows: []} as UserEntity);
            expect(result).toEqual(userEntityMock);
        });
    });
    */ 

});