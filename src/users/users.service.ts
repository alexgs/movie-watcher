/*
 * Copyright 2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserByUsernameQuery } from './queries/get-user-by-username.query';
import { UserReadModel } from './user.read-model';

@Injectable()
export class UsersService {
  constructor(private readonly queryBus: QueryBus) {}

  async getUserByUsername({ username }: { username: string }) {
    const query = new GetUserByUsernameQuery(username);
    return this.queryBus.execute<GetUserByUsernameQuery, UserReadModel>(query);
  }
}
