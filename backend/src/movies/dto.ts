import { ApiProperty } from '@nestjs/swagger';

import { Movie } from '../entity/movie.entity';

export class MovieDetailsDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  logoUrl: string;
  @ApiProperty()
  rating: number;
  @ApiProperty()
  tags: string[];
  @ApiProperty()
  slug: string;
  constructor(data: Movie) {
    this.id = data.id.toString();
    this.title = data.title;
    this.description = data.description;
    this.logoUrl = data.logoUrl;
    this.rating = data.rating;
    this.slug = data.slug;
  }
}

export class MovieDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  slug: string;
  @ApiProperty()
  rating: number;
  constructor(data: Movie) {
    this.id = data.id.toString();
    this.title = data.title;
    this.slug = data.slug;
    this.rating = data.rating;
  }
}
