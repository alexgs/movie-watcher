/*
 * Copyright 2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { WatchMovieDto } from './dto/watch-movie.dto';
import { MoviesFacade } from './movies.facade';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesFacade: MoviesFacade) {}

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesFacade.create({
      title: createMovieDto.title,
      year: createMovieDto.year,
    });
  }

  @Get('/:id')
  async getById(@Param('id') movieId: string) {
    return this.moviesFacade.getMovieById({ movieId });
  }

  @Post('/:id/watch')
  async watch(
    @Param('id') movieId: string,
    @Body() watchMovieDto: WatchMovieDto,
  ) {
    return this.moviesFacade.watch({
      movieId,
      username: watchMovieDto.username,
    });
  }
}
