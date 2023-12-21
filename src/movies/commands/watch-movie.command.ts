/*
 * Copyright 2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

export class WatchMovieCommand {
  constructor(
    public readonly movieId: string,
    public readonly username: string,
  ) {}
}
