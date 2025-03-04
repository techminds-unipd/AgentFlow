import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/UserModule';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UserModule,
    MongooseModule.forRoot('mongodb://root:password@mongo:27017/')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
