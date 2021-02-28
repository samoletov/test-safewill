import { ClassSerializerInterceptor, Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { MovieDetailsDto, MovieDto } from './dto';
import { MoviesService } from './service';

@Controller()
@ApiTags('movie')
@UseInterceptors(ClassSerializerInterceptor)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('list')
  @ApiOperation({
    summary: 'Get top movies',
  })
  async list(): Promise<MovieDto[]> {
    return (await this.moviesService.top10()).map((movie) => new MovieDto(movie));
  }

  @Get('search')
  @ApiOperation({
    summary: 'Search top movies',
  })
  async search(@Query('searchTerm') searchTerm: string): Promise<MovieDto[]> {
    return (await this.moviesService.search(searchTerm)).map((movie) => new MovieDto(movie));
  }

  @Get('item/:slug')
  @ApiOperation({
    summary: 'Get movie by slug',
  })
  async item(@Param('slug') slug: string): Promise<MovieDetailsDto> {
    const movie = await this.moviesService.findOneBySlug(slug);
    const dto = new MovieDetailsDto(movie);
    dto.tags = (await movie.tags).map((tag) => tag.name);
    return dto;
  }

  @Get('item/:slug/suggested')
  @ApiOperation({
    summary: 'Get movies suggested to this movie',
  })
  async suggested(@Param('slug') slug: string): Promise<MovieDto[]> {
    const movie = await this.moviesService.findOneBySlug(slug);
    return (await this.moviesService.suggested(movie)).map((suggested) => new MovieDto(suggested));
  }
}
