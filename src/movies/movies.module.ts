/*
 * Copyright 2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { Module } from '@nestjs/common';
import { MoviesFacade } from './movies.facade';
import { MoviesController } from './movies.controller';
import { CreateMovieCommandHandler } from './commands/create-movie.command-handler';

@Module({
  controllers: [MoviesController],
  providers: [CreateMovieCommandHandler, MoviesFacade],
})
export class MoviesModule {}
