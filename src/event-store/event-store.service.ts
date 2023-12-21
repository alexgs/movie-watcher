import { Injectable } from '@nestjs/common';
import { knex } from 'knex';
import { ulid } from 'ulidx';
import { KnexService } from '../knex/knex.service';
import { appendEvent } from './append-event';
import { Event, StreamRecord } from './interfaces';

@Injectable()
export class EventStoreService {
  private readonly knex: knex.Knex;

  constructor(knexService: KnexService) {
    this.knex = knexService.getKnex();
  }

  async appendEvent(event: Event) {
    return appendEvent(this.knex, event);
  }

  async createEvent(
    streamId: string,
    streamType: string,
    eventType: string,
    data: object,
  ): Promise<Event> {
    const streamRecord = await this.knex<StreamRecord>('streams')
      .select()
      .where('id', streamId);
    const expectedVersion =
      streamRecord.length === 0 ? 0 : streamRecord[0].version;
    return {
      id: ulid(),
      streamId,
      streamType,
      type: eventType,
      data,
      expectedVersion,
    };
  }
}
