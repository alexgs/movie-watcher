/*
 * Copyright 2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { BadRequestException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as crypto from 'crypto';
import { knex } from 'knex';
import { EVENT_TYPES, STREAM_TYPES } from '../constants';
import { EventStoreService } from '../../event-store/event-store.service';
import { KnexService } from '../../projections/knex.service';
import { CreateMovieCommand } from './create-movie.command';

@CommandHandler(CreateMovieCommand)
export class CreateMovieCommandHandler
  implements ICommandHandler<CreateMovieCommand>
{
  private readonly knex: knex.Knex;
  private readonly logger = new Logger(CreateMovieCommandHandler.name);

  constructor(
    private readonly eventStoreService: EventStoreService,
    knexService: KnexService,
  ) {
    this.knex = knexService.getKnex();
  }

  async execute(command: CreateMovieCommand) {
    this.logger.debug(
      `Processing "CreateMovieCommand": ${JSON.stringify(command)}`,
    );

    const movie = {
      title: command.title,
      year: command.year,
    };

    // Check for duplicate movies in the projection database before creating the
    //   event. This is done with the understanding that duplicates could still
    //   creep in. In a production system, you'd need a separate cron process to
    //   check for dupes and merge them.
    const existingMovies = await this.knex('movies').select().where({
      title: movie.title,
      year: movie.year,
    });
    if (existingMovies.length > 0) {
      this.logger.verbose(`Movie already exists: ${JSON.stringify(movie)}`);
      throw new BadRequestException('Movie already exists');
    }

    const event = await this.eventStoreService.createEvent(
      crypto.randomUUID(),
      STREAM_TYPES.MOVIE,
      EVENT_TYPES.MOVIE_CREATED,
      movie,
    );

    await this.eventStoreService.appendEvent(event);

    // This return value gets used for the response payload
    return movie;
  }
}
