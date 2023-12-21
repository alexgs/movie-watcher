/*
 * Copyright 2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateMovieCommand } from './commands/create-movie.command';
import { WatchMovieCommand } from './commands/watch-movie.command';

@Injectable()
export class MoviesFacade {
  constructor(private readonly commandBus: CommandBus) {}

  create({ title, year }: { title: string; year: string }) {
    const command = new CreateMovieCommand(title, year);
    return this.commandBus.execute(command);
  }

  watch({ movieId, username }: { movieId: string; username: string }) {
    const command = new WatchMovieCommand(movieId, username);
    return this.commandBus.execute(command);
  }
}
