/*
 * Copyright 2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMovieCommand } from './create-movie.command';
import { Logger } from '@nestjs/common';

@CommandHandler(CreateMovieCommand)
export class CreateMovieCommandHandler
  implements ICommandHandler<CreateMovieCommand>
{
  private readonly logger = new Logger(CreateMovieCommandHandler.name);

  constructor() {}

  async execute(command: CreateMovieCommand) {
    this.logger.debug(
      `Processing "CreateMovieCommand": ${JSON.stringify(command)}`,
    );

    const movie = {
      title: command.title,
      year: command.year,
    };

    return movie;
  }
}
