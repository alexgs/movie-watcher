import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { knex } from 'knex';

@Injectable()
export class KnexService {
  private knexObject: knex.Knex;

  constructor(private readonly configService: ConfigService) {}

  private initializeKnex() {
    this.knexObject = knex({
      client: 'pg',
      connection: {
        database: this.configService.get<string>('DATABASE_NAME'),
        host: this.configService.get<string>('DATABASE_HOST'),
        password: this.configService.get<string>('DATABASE_PASSWORD'),
        port: this.configService.get<number>('DATABASE_PORT'),
        user: this.configService.get<string>('DATABASE_USER'),
      },
      debug: true,
    });
  }

  getKnex(): knex.Knex {
    if (!this.knexObject) {
      this.initializeKnex();
    }
    return this.knexObject;
  }
}
