/*
 * Copyright 2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

export interface Event {
  id: string;
  data: object;
  expectedVersion: number;
  streamId: string;
  streamType: string;
  type: string;
}

export interface StreamRecord {
  id: string;
  type: string;
  version: number;
}
