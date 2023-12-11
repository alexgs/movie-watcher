/*
 * Copyright 2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { KnexOptions } from './knex-options.interface';

import { KNEX_OPTIONS } from './constants';

export function createKnexProviders(options: KnexOptions) {
  return [
    {
      provide: KNEX_OPTIONS,
      useValue: options,
    },
  ];
}
