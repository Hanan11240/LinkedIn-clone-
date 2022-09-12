import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedModule } from './feed/feed.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/api'), FeedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
