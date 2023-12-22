/*
 * Copyright 2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { knex } from 'knex';
import { KnexService } from '../../projections/knex.service';
import { MovieCreatedEvent } from './movie-created.event';

@EventsHandler(MovieCreatedEvent)
export class MoviesTableProjector implements IEventHandler<MovieCreatedEvent> {
  private readonly knex: knex.Knex;
  private readonly logger = new Logger(MoviesTableProjector.name);

  constructor(knexService: KnexService) {
    this.knex = knexService.getKnex();
  }

  async handle(event: MovieCreatedEvent) {
    this.logger.debug(`Received event: ${JSON.stringify(event)}`);
    await this.knex.transaction(async (trx) => {
      // We assume `id` is unique and let the database throw an error if not
      await trx('movies').insert({
        id: event.movieId,
        title: event.title,
        year: event.year,
      });
    });
    this.logger.debug('Finished processing event');
  }
}
