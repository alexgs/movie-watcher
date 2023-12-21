import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as postgres from 'postgres';

@Injectable()
export class EventPublisherService implements OnModuleInit, OnModuleDestroy {
  private unsubscribe: () => void;

  constructor(private readonly configService: ConfigService) {}

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
    const result = await sql.subscribe(
      'insert:events',
      (row) => {
        console.log(`>> ${JSON.stringify(row)} <<`);
      },
      () => {
        // Callback on initial connect and potential reconnects
        console.log('<< Connected to Postgres >>');
      },
    );
    this.unsubscribe = result.unsubscribe;
  }
}
