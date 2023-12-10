import { Body, Controller, Post } from '@nestjs/common';
import { MoviesFacade } from './movies.facade';
import { CreateMovieDto } from './dto/create-movie.dto';

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
}
