import { Module } from '@nestjs/common';
import { KnexModule } from '../knex/knex.module';
import { EventStoreService } from './event-store.service';

@Module({
  exports: [EventStoreService],
  imports: [KnexModule],
  providers: [EventStoreService],
})
export class EventStoreModule {}
