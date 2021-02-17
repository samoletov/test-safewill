import { ClassSerializerInterceptor, Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { MovieDetailsDto, MovieDto } from './movie.dto';
import { MoviesService } from './movies.service';

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

  @Get('item/:id')
  @ApiOperation({
    summary: 'Get top movies',
  })
  async item(@Param('id') id: string): Promise<MovieDetailsDto> {
    return new MovieDetailsDto(await this.moviesService.findOne(id));
  }
}
