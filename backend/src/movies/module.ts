import { Module, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Movie } from '../entity/movie.entity';
import { SearchModule } from '../search/module';
import SearchService from '../search/service';
import { MoviesController } from './controller';
import { MoviesService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), SearchModule],
  controllers: [MoviesController],
  providers: [MoviesService, SearchService],
})
export class MoviesModule implements OnModuleInit {
  constructor(private moduleRef: ModuleRef) {}
  async onModuleInit() {
    // TODO: remove and make indexation upon entity update
    this.moduleRef.get<MoviesService>('MoviesService').reindex();
  }
}
