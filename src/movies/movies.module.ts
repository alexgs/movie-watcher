/*
 * Copyright 2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { Module } from '@nestjs/common';
import { EventStoreModule } from '../event-store/event-store.module';
import { ProjectionsModule } from '../projections/projections.module';
import { CreateMovieCommandHandler } from './commands/create-movie.command-handler';
import { WatchMovieCommandHandler } from './commands/watch-movie.command-handler';
import { MoviesTableProjector } from './events/movies-table.projector';
import { MovieWatchedEventHandler } from './events/movie-watched.event-handler';
import { MoviesFacade } from './movies.facade';
import { MoviesController } from './movies.controller';
import { GetMovieByIdQueryHandler } from './queries/get-movie-by-id.query-handler';

@Module({
  controllers: [MoviesController],
  imports: [EventStoreModule, ProjectionsModule],
  providers: [
    CreateMovieCommandHandler,
    GetMovieByIdQueryHandler,
    MoviesFacade,
    MoviesTableProjector,
    MovieWatchedEventHandler,
    WatchMovieCommandHandler,
  ],
})
export class MoviesModule {}
