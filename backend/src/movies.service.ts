import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private MoviesRepository: Repository<Movie>,
  ) {}

  top10(): Promise<Movie[]> {
    return this.MoviesRepository.find({
      order: {
        rating: 'DESC',
      },
      take: 10,
    });
  }

  findOne(id: string): Promise<Movie> {
    return this.MoviesRepository.findOne(id);
  }
}
