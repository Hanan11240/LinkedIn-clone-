import { Module } from '@nestjs/common';
import { FeedService } from './services/feed.service';
import { FeedController } from './controller/feed.controller';
import { PostSchema } from './models/postSchema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([
    {name:'Posts',schema:PostSchema}
  ])],
  providers: [FeedService],
  controllers: [FeedController]
})
export class FeedModule {
      
}
