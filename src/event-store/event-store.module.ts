import { Module } from '@nestjs/common';
import { EventPublisherService } from './event-publisher.service';
import { EventStoreService } from './event-store.service';
import { KnexService } from './knex.service';

@Module({
  exports: [EventStoreService],
  imports: [],
  providers: [EventPublisherService, EventStoreService, KnexService],
})
export class EventStoreModule {}
