/*
 * Copyright 2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MovieWatchedEvent } from './movie-watched.event';

@EventsHandler(MovieWatchedEvent)
export class MovieWatchedEventHandler
  implements IEventHandler<MovieWatchedEvent>
{
  private readonly logger = new Logger(MovieWatchedEventHandler.name);

  handle(event: MovieWatchedEvent) {
    this.logger.debug(`Received event: ${JSON.stringify(event)}`);
  }
}
