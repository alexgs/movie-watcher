import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { knex } from 'knex';
import { KnexService } from '../../projections/knex.service';
import { UserReadModel } from '../user.read-model';
import { GetUserByUsernameQuery } from './get-user-by-username.query';

@QueryHandler(GetUserByUsernameQuery)
export class GetUserByUsernameQueryHandler
  implements IQueryHandler<GetUserByUsernameQuery, UserReadModel | null>
{
  private readonly knex: knex.Knex;

  constructor(knexService: KnexService) {
    this.knex = knexService.getKnex();
  }

  async execute(query: GetUserByUsernameQuery): Promise<UserReadModel | null> {
    const records = await this.knex('movies_watched')
      .select()
      .where('username', query.username);
    if (records.length === 0) {
      return null;
    }
    return records.reduce(
      (acc, record) => {
        acc.username = record.username;
        acc.moviesWatched.push({
          movieId: record.movie_id,
          title: 'some movie', // TODO We need a separate movies table to join on
          totalTimesWatched: 0,
        });
        return acc;
      },
      { username: '', moviesWatched: [] },
    );
  }
}
