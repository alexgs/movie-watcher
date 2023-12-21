/*
 * Copyright 2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { Module } from '@nestjs/common';
import { EventStoreModule } from '../event-store/event-store.module';
import { CreateMovieCommandHandler } from './commands/create-movie.command-handler';
import { WatchMovieCommandHandler } from './commands/watch-movie.command-handler';
import { MoviesFacade } from './movies.facade';
import { MoviesController } from './movies.controller';
import { GetMovieByIdQueryHandler } from './queries/get-movie-by-id.query-handler';

@Module({
  controllers: [MoviesController],
  imports: [EventStoreModule],
  providers: [
    CreateMovieCommandHandler,
    GetMovieByIdQueryHandler,
    MoviesFacade,
    WatchMovieCommandHandler,
  ],
})
export class MoviesModule {}
