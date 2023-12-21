/*
 * Copyright 2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MovieWatchedEvent } from './movie-watched.event';

@EventsHandler(MovieWatchedEvent)
export class MovieWatchedEventHandler
  implements IEventHandler<MovieWatchedEvent>
{
  handle(event: MovieWatchedEvent) {
    console.log('>>>', event, '<<<');
  }
}
