import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MoviesModule } from './movies/module';
import { SearchModule } from './search/module';

@Module({
  imports: [TypeOrmModule.forRoot(), MoviesModule, SearchModule],
})
export class AppModule {}
