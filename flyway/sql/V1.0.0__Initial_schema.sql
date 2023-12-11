/*
 * Copyright 2022-2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

--[ # EVENT STORE TABLES # ]--

--[ ## TABLE public.events ## ]--

CREATE TABLE IF NOT EXISTS public.events
(
  id         CHAR(26)                                                 NOT NULL
    CONSTRAINT events_pk
      PRIMARY KEY,
  created_at TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  data       JSONB                                                    NOT NULL,
  stream_id  UUID                                                     NOT NULL,
  type       TEXT                                                     NOT NULL,
  version    INT                                                      NOT NULL
);

--[ ## TABLE public.streams ## ]--

CREATE TABLE IF NOT EXISTS public.streams
(
  id      UUID NOT NULL
    CONSTRAINT streams_pk
      PRIMARY KEY,
  type    TEXT NOT NULL,
  version INT  NOT NULL
);
