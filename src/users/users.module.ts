/*
 * Copyright 2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { Module } from '@nestjs/common';
import { MovieToUserProjector } from './events/movie-to-user.projector';
import { KnexService } from './knex.service';
import { GetUserByUsernameQueryHandler } from './queries/get-user-by-username.query-handler';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [
    GetUserByUsernameQueryHandler,
    KnexService,
    MovieToUserProjector,
    UsersService,
  ],
})
export class UsersModule {}
