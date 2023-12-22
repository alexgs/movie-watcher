import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { knex } from 'knex';
import { KnexService } from '../../projections/knex.service';
import { UserReadModel } from '../user.read-model';
import { GetUserByUsernameQuery } from './get-user-by-username.query';

interface QueryRecord {
  id: number;
  username: string;
  movie_id: string;
  count: number;
  title: string;
  year: string;
}

@QueryHandler(GetUserByUsernameQuery)
export class GetUserByUsernameQueryHandler
  implements IQueryHandler<GetUserByUsernameQuery, UserReadModel | null>
{
  private readonly knex: knex.Knex;

  constructor(knexService: KnexService) {
    this.knex = knexService.getKnex();
  }

  async execute(query: GetUserByUsernameQuery): Promise<UserReadModel | null> {
    const records: QueryRecord[] = await this.knex<QueryRecord>(
      'movies_watched',
    )
      .select()
      .where('username', query.username)
      .join('movies', 'movies_watched.movie_id', '=', 'movies.id');

    if (records.length === 0) {
      return null;
    }

    return records.reduce(
      (acc: UserReadModel, record) => {
        acc.username = record.username;
        acc.moviesWatched.push({
          movieId: record.movie_id,
          title: record.title,
          totalTimesWatched: record.count,
        });
        return acc;
      },
      { username: '', moviesWatched: [] },
    );
  }
}
