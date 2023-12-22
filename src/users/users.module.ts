/*
 * Copyright 2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { Module } from '@nestjs/common';
import { KnexService } from './knex.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MovieToUserProjector } from './events/movie-to-user.projector';

@Module({
  controllers: [UsersController],
  providers: [KnexService, MovieToUserProjector, UsersService],
})
export class UsersModule {}
