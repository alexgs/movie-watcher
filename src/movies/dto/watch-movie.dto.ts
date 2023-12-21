/*
 * Copyright 2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const WatchMovieSchema = z.object({
  // movieId is provided in path params
  username: z.string(),
});

export class WatchMovieDto extends createZodDto(WatchMovieSchema) {}
