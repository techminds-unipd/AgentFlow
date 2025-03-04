import { Module } from '@nestjs/common';
import { UserModule } from './user/UserModule';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule,
    MongooseModule.forRoot('mongodb://root:password@localhost:27017/'),
    JwtModule.register({
      global: true,
      secret: "chiaveSegreta",
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
