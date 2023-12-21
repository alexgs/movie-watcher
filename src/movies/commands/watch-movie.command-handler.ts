/*
 * Copyright 2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
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
      'stream-types.movie',
      'event-types.movie-watched',
      { username: command.username },
    );
    await this.eventStoreService.appendEvent(event);

    return { movieId: command.movieId, username: command.username };
  }
}
