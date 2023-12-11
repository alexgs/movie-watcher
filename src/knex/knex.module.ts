/*
 * Copyright 2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { Module, DynamicModule, Global } from '@nestjs/common';
import { KnexService } from './knex.service';
import { KnexOptions } from './knex-options.interface';
import { createKnexProviders } from './knex.provider';

@Global()
@Module({
  providers: [KnexService],
  exports: [KnexService],
})
export class KnexModule {
  /**
   * Registers a configured NestKnex Module for import into the current module
   */
  public static register(options: KnexOptions): DynamicModule {
    return {
      module: KnexModule,
      providers: createKnexProviders(options),
    };
  }
}
