import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as TextCleaner from 'text-cleaner';
import { In, Repository } from 'typeorm';

import { Movie } from '../entity/movie.entity';
import SearchService from '../search/service';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    private searchService: SearchService,
  ) {}

  top10(): Promise<Movie[]> {
    return this.moviesRepository.find({
      order: {
        rating: 'DESC',
      },
      take: 10,
    });
  }

  findOneBySlug(slug: string): Promise<Movie> {
    return this.moviesRepository.findOne({ slug });
  }

  async search(searchTerm: string): Promise<Movie[]> {
    const cleanTerm = searchTerm ? TextCleaner(searchTerm).removeStopWords().valueOf() : '';
    const results = await this.searchService.search(cleanTerm);
    const ids = results.map((result) => result.id);
    if (!ids.length) {
      return [];
    }
    return this.moviesRepository.find({
      where: { id: In(ids) },
    });
  }

  private clearTitle(title: string) {
    let cleanTitle: string = title ? TextCleaner(title).removeStopWords().valueOf() : '';
    // remove subtitle
    let dotsIndex = cleanTitle.indexOf(':');
    if (dotsIndex) {
      cleanTitle = cleanTitle.substr(0, dotsIndex - 1);
    }
    return cleanTitle;
  }

  async suggested(movie: Movie): Promise<Movie[]> {
    const tags = await movie.tags;

    const results = await this.searchService.search(this.clearTitle(movie.title), ['title']);
    const ids = results.map((result) => result.id).filter((item) => item !== movie.id);

    const qb = this.moviesRepository.createQueryBuilder('m').limit(5).orderBy('m.rating', 'DESC');
    if (tags.length) {
      qb.leftJoinAndSelect('m.tags', 'tag').where('tag.id = ANY(:tagIds)', { tagIds: [tags.map((tag) => tag.id)] });
    } else if (ids.length) {
      qb.whereInIds(ids);
    } else {
      return [];
    }

    return await qb.getMany();
  }

  async reindex() {
    console.log('Records', await this.moviesRepository.count());
    await this.searchService.dropIndex();
    const time = new Date().getMilliseconds();
    (await this.moviesRepository.find()).map(async (movie) => await this.searchService.indexMovie(movie));
    console.log('Reindex time', `${new Date().getMilliseconds() - time}ms`);
  }
}
