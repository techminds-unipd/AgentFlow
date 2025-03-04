import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterUserModule } from './user/RegisterUserModule';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [RegisterUserModule,
    MongooseModule.forRoot('mongodb://root:password@mongo:27017/')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
