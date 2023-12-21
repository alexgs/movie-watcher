import { Module } from '@nestjs/common';
import { EventStoreService } from './event-store.service';
import { KnexService } from './knex.service';

@Module({
  exports: [EventStoreService],
  imports: [],
  providers: [EventStoreService, KnexService],
})
export class EventStoreModule {}
