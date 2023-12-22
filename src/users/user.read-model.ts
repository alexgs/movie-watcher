/*
 * Copyright 2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

export class UserReadModel {
  username: string;
  moviesWatched: Array<{
    movieId: string;
    title: string;
    totalTimesWatched: number;
  }>;
}
