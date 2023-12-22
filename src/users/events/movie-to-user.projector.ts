/*
 * Copyright 2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { knex } from 'knex';
import { MovieWatchedEvent } from '../../movies/events/movie-watched.event';
import { KnexService } from '../../projections/knex.service';

@EventsHandler(MovieWatchedEvent)
export class MovieToUserProjector implements IEventHandler<MovieWatchedEvent> {
  private readonly knex: knex.Knex;
  private readonly logger = new Logger(MovieToUserProjector.name);

  constructor(knexService: KnexService) {
    this.knex = knexService.getKnex();
  }

  async handle(event: MovieWatchedEvent) {
    this.logger.debug(`Received event: ${JSON.stringify(event)}`);
    await this.knex.transaction(async (trx) => {
      const records = await trx('movies_watched')
        .select()
        .where('username', event.username)
        .andWhere('movie_id', event.movieId);

      if (records.length === 0) {
        await trx('movies_watched').insert({
          username: event.username,
          movie_id: event.movieId,
          count: 1,
        });
      } else {
        await trx('movies_watched')
          .update({
            count: records[0].count + 1,
          })
          .where('username', event.username)
          .andWhere('movie_id', event.movieId);
      }
    });
    this.logger.debug('Finished processing event');
  }
}
