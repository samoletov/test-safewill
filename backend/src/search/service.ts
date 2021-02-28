import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Movie } from 'src/entity/movie.entity';

import { MovieSearchBody, MovieSearchResult } from './interfaces';

@Injectable()
export default class SearchService {
  index = 'movies';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexMovie(movie: Movie) {
    return await this.elasticsearchService.index<MovieSearchResult, MovieSearchBody>({
      index: this.index,
      body: {
        id: movie.id,
        title: movie.title,
        description: movie.description,
      },
    });
  }

  async dropIndex() {
    try {
      await this.elasticsearchService.indices.delete({
        index: this.index,
      });
    } catch (error) {}
    try {
      await this.elasticsearchService.indices.create({
        index: this.index,
      });
    } catch (error) {}
  }

  async search(text: string, fields: string[] = ['title', 'description']) {
    const { body } = await this.elasticsearchService.search<MovieSearchResult>({
      index: this.index,
      body: {
        query: {
          multi_match: {
            query: `${text}`,
            fields,
          },
        },
      },
    });
    const hits = body.hits.hits;
    return hits.map((item) => item._source);
  }
}
