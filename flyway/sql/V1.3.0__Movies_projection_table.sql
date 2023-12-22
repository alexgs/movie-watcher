/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

--[ # PROJECTION TABLES # ]--

--[ ## TABLE public.movies ## ]--

CREATE TABLE IF NOT EXISTS public.movies
(
  id    UUID NOT NULL
    CONSTRAINT movies_pk
      PRIMARY KEY,
  title TEXT NOT NULL,
  year  TEXT NOT NULL
);

CREATE INDEX movies_title_index
  ON public.movies (title);
