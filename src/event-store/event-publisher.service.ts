import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventBus } from '@nestjs/cqrs';
import * as postgres from 'postgres';
import { MovieWatchedEvent } from '../movies/events/movie-watched.event';
import { EventReadModel } from './interfaces';

@Injectable()
export class EventPublisherService implements OnModuleInit, OnModuleDestroy {
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
        console.log('Received event', row);
        const event = new MovieWatchedEvent(
          row.stream_id,
          row.data.username as string,
        );
        this.eventBus.publish(event);
      },
      () => {
        // Callback on initial connect and potential reconnects
        console.log('<< Connected to Postgres >>');
      },
    );
    this.unsubscribe = subscriptionHandle.unsubscribe;
  }
}
