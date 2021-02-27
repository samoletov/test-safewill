import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MoviesModule } from './movies.module';

@Module({
  imports: [TypeOrmModule.forRoot(), MoviesModule],
})
export class AppModule {}
