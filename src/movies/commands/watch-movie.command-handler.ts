/*
 * Copyright 2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EVENT_TYPES, STREAM_TYPES } from '../constants';
import { EventStoreService } from '../../event-store/event-store.service';
import { WatchMovieCommand } from './watch-movie.command';

@CommandHandler(WatchMovieCommand)
export class WatchMovieCommandHandler
  implements ICommandHandler<WatchMovieCommand>
{
  private readonly logger = new Logger(WatchMovieCommandHandler.name);

  constructor(private readonly eventStoreService: EventStoreService) {}

  async execute(command: WatchMovieCommand) {
    this.logger.debug(
      `Processing "WatchMovieCommand": ${JSON.stringify(command)}`,
    );

    const event = await this.eventStoreService.createEvent(
      command.movieId,
      STREAM_TYPES.MOVIE,
      EVENT_TYPES.MOVIE_WATCHED,
      { username: command.username },
    );
    await this.eventStoreService.appendEvent(event);

    // TODO Ideally, we should listen to the database for the event to be
    //   written, and only after the database has been updated should we return
    //   the result.

    return { movieId: command.movieId, username: command.username };
  }
}
