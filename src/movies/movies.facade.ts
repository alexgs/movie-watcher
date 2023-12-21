/*
 * Copyright 2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateMovieCommand } from './commands/create-movie.command';
import { WatchMovieCommand } from './commands/watch-movie.command';
import { MovieReadModel } from './movie.read-model';
import { GetMovieByIdQuery } from './queries/get-movie-by-id.query';

@Injectable()
export class MoviesFacade {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create({ title, year }: { title: string; year: string }) {
    const command = new CreateMovieCommand(title, year);
    return this.commandBus.execute(command);
  }

  async getMovieById({
    movieId,
  }: {
    movieId: string;
  }): Promise<MovieReadModel> {
    const query = new GetMovieByIdQuery(movieId);
    return this.queryBus.execute<GetMovieByIdQuery, MovieReadModel>(query);
  }

  watch({ movieId, username }: { movieId: string; username: string }) {
    const command = new WatchMovieCommand(movieId, username);
    return this.commandBus.execute(command);
  }
}
