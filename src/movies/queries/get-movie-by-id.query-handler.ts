/*
 * Copyright 2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MovieReadModel } from '../movie.read-model';
import { EventStoreService } from '../../event-store/event-store.service';
import { EventReadModel } from '../../event-store/interfaces';
import { EVENT_TYPES } from '../constants';
import { GetMovieByIdQuery } from './get-movie-by-id.query';

@QueryHandler(GetMovieByIdQuery)
export class GetMovieByIdQueryHandler
  implements IQueryHandler<GetMovieByIdQuery, MovieReadModel>
{
  constructor(private readonly eventStore: EventStoreService) {}

  async execute(query: GetMovieByIdQuery): Promise<MovieReadModel> {
    const events: EventReadModel[] = await this.eventStore.getEventsByStreamId(
      query.movieId,
    );
    const movie = new MovieReadModel();
    events.forEach((event) => {
      switch (event.type) {
        case EVENT_TYPES.MOVIE_CREATED:
          movie.id = event.stream_id;
          movie.title = event.data.title as string;
          movie.totalTimesWatched = 0;
          break;
        case EVENT_TYPES.MOVIE_WATCHED:
          movie.totalTimesWatched++;
          break;
      }
    });
    return movie;
  }
}
