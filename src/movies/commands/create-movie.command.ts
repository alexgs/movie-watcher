/*
 * Copyright 2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

export class CreateMovieCommand {
  constructor(
    public readonly title: string,
    public readonly year: string,
  ) {}
}
