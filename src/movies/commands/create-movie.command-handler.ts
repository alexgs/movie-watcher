/*
 * Copyright 2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as crypto from 'crypto';
import { CreateMovieCommand } from './create-movie.command';
import { EventStoreService } from '../../event-store/event-store.service';

@CommandHandler(CreateMovieCommand)
export class CreateMovieCommandHandler
  implements ICommandHandler<CreateMovieCommand>
{
  private readonly logger = new Logger(CreateMovieCommandHandler.name);

  constructor(private readonly eventStoreService: EventStoreService) {}

  async execute(command: CreateMovieCommand) {
    this.logger.debug(
      `Processing "CreateMovieCommand": ${JSON.stringify(command)}`,
    );

    const movie = {
      title: command.title,
      year: command.year,
    };

    // TODO Check for duplicate movies in the database before creating the
    //   event. It's not immediately obvious how to do this. I think the best
    //   solution might be to check the projections with the understanding that
    //   duplicates could still creep in. In a production system, you'd need a
    //   separate cron process to check for dupes and merge them.
    // throw new BadRequestException('Movie already exists');

    const event = await this.eventStoreService.createEvent(
      crypto.randomUUID(),
      'stream-types.movie',
      'event-types.movie-created',
      movie,
    );

    await this.eventStoreService.appendEvent(event);

    // This return value gets used for the response payload
    return movie;
  }
}
