/*
 * Copyright 2023 Phillip Gates-Shannon. All rights reserved. Licensed
 * under the Open Software License version 3.0.
 */

import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateMovieSchema = z.object({
  title: z.string(),
  year: z.string(),
});

export class CreateMovieDto extends createZodDto(CreateMovieSchema) {}
