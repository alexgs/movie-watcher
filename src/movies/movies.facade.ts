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

interface CreatePayload {
  title: string;
  year: string;
}

interface MovieIdPayload {
  movieId: string;
}

interface WatchPayload {
  movieId: string;
  username: string;
}

@Injectable()
export class MoviesFacade {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create({ title, year }: CreatePayload) {
    const command = new CreateMovieCommand(title, year);
    return this.commandBus.execute(command);
  }

  async getMovieById({ movieId }: MovieIdPayload): Promise<MovieReadModel> {
    const query = new GetMovieByIdQuery(movieId);
    return this.queryBus.execute<GetMovieByIdQuery, MovieReadModel>(query);
  }

  watch({ movieId, username }: WatchPayload) {
    const command = new WatchMovieCommand(movieId, username);
    return this.commandBus.execute(command);
  }
}
