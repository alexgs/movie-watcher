import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventBus } from '@nestjs/cqrs';
import * as postgres from 'postgres';
import { EVENT_TYPES } from '../movies/constants';
import { MovieWatchedEvent } from '../movies/events/movie-watched.event';
import { MovieCreatedEvent } from '../movies/events/movie-created.event';
import { EventReadModel } from './interfaces';

@Injectable()
export class EventPublisherService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(EventPublisherService.name);
  private unsubscribe: () => void;

  constructor(
    private readonly configService: ConfigService,
    private readonly eventBus: EventBus,
  ) {}

  async onModuleDestroy() {
    this.unsubscribe();
  }

  async onModuleInit() {
    const sql = postgres({
      database: this.configService.get<string>('DATABASE_NAME'),
      host: this.configService.get<string>('DATABASE_HOST'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      port: this.configService.get<number>('DATABASE_PORT'),
      publications: 'event_publication',
      user: this.configService.get<string>('DATABASE_USER'),
    });
    const subscriptionHandle = await sql.subscribe(
      'insert:events',
      (row: EventReadModel) => {
        this.logger.debug(`Publishing event: ${JSON.stringify(row)}`);
        const event = this.createEventFromRow(row);
        this.eventBus.publish(event);
      },
      () => {
        // Callback on initial connect and potential reconnects
        this.logger.debug('Connected to PostgreSQL');
      },
    );
    this.unsubscribe = subscriptionHandle.unsubscribe;
  }

  private createEventFromRow(row: EventReadModel) {
    switch (row.type) {
      case EVENT_TYPES.MOVIE_CREATED:
        return new MovieCreatedEvent(
          row.stream_id,
          row.data.title as string,
          row.data.year as string,
        );
      case EVENT_TYPES.MOVIE_WATCHED:
        return new MovieWatchedEvent(
          row.stream_id,
          row.data.username as string,
        );
      default:
        throw new Error(`Unknown event type: ${row.type}`);
    }
  }
}
