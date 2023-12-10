import { Module } from '@nestjs/common';
import { MoviesFacade } from './movies.facade';
import { MoviesController } from './movies.controller';

@Module({
  controllers: [MoviesController],
  providers: [MoviesFacade],
})
export class MoviesModule {}
