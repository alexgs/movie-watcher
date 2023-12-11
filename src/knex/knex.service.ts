import { Inject, Injectable, Logger } from '@nestjs/common';
import { knex } from 'knex';
import { KNEX_OPTIONS } from './constants';
import { KnexOptions } from './knex-options.interface';

@Injectable()
export class KnexService {
  private readonly logger: Logger;
  private knexObject: any;
  constructor(@Inject(KNEX_OPTIONS) private knexOptions: KnexOptions) {
    this.logger = new Logger('KnexService');
    this.logger.log(`Options: ${JSON.stringify(this.knexOptions)}`);
  }

  getKnex() {
    if (!this.knexObject) {
      this.knexObject = knex(this.knexOptions);
    }
    return this.knexObject;
  }
}
