import { Injectable } from '@nestjs/common';

@Injectable()
export class MoviesFacade {
  create({ title, year }: { title: string; year: string }) {
    return `This adds a new movie with title ${title} and year ${year}`;
  }
}
