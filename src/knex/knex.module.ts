/*
 * Copyright 2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { Module, Global } from '@nestjs/common';
import { KnexService } from './knex.service';

@Global()
@Module({
  exports: [KnexService],
  providers: [KnexService],
})
export class KnexModule {}
