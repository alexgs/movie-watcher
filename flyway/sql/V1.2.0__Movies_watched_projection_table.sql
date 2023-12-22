/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

--[ # PROJECTION TABLES # ]--

--[ ## TABLE public.movies_watched ## ]--

CREATE TABLE IF NOT EXISTS public.movies_watched
(
  id       SERIAL
    CONSTRAINT movies_watched_pk
      PRIMARY KEY,
  username TEXT NOT NULL,
  movie_id UUID NOT NULL,
  count    INT  NOT NULL
);

CREATE UNIQUE INDEX movies_watched_by_user
  ON public.movies_watched (username, movie_id);

CREATE INDEX movies_watched_username
  ON public.movies_watched (username);
