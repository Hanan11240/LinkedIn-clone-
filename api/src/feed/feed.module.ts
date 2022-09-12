import { Module } from '@nestjs/common';
import { FeedService } from './services/feed.service';
import { FeedController } from './controller/feed.controller';

@Module({
  providers: [FeedService],
  controllers: [FeedController]
})
export class FeedModule {
      
}
