/*
 * Copyright 2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateMovieCommand } from './commands/create-movie.command';

@Injectable()
export class MoviesFacade {
  constructor(private readonly commandBus: CommandBus) {}

  create({ title, year }: { title: string; year: string }) {
    const command = new CreateMovieCommand(title, year);
    return this.commandBus.execute(command);
  }
}
