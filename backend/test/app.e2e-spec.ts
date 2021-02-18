import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/movie.entity';
import { IMovie } from 'src/movie.interface';
import * as request from 'supertest';
import { Repository } from 'typeorm';

import { MoviesModule } from '../src/movies.module';
import * as initData from './data/init.json';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<Movie>;
  let entities: Movie[];
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MoviesModule,
        TypeOrmModule.forRoot({
          type: 'mongodb',
          host: 'localhost',
          port: 27017,
          username: 'root',
          password: 'example',
          database: 'movies',
          entities: ['**/*.entity.ts'],
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    repository = moduleFixture.get('MovieRepository');
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    entities = await repository.save(
      initData.map((item: IMovie) => {
        const movie = new Movie();
        movie.title = item.title;
        movie.rating = item.rating;
        movie.logoUrl = item.logoUrl;
        movie.description = item.description;
        return movie;
      }),
    );
  });

  afterEach(async () => {
    await repository.clear();
  });

  it('/list (GET)', async () => {
    const { status, body } = await request(app.getHttpServer()).get('/list');
    expect(status).toEqual(200);
    expect(body).toHaveLength(10);
    expect(body[0]).toHaveProperty('id');
    expect(body[0]).toHaveProperty('title');
    expect(body[0].title).toEqual('Fight Club');
    expect(body[0].description).toBeUndefined();
    expect(body[0].logoUrl).toBeUndefined();
    expect(body[0].rating).toBeUndefined();
  });

  it('/item/{id} (GET)', async () => {
    const { status, body } = await request(app.getHttpServer()).get(`/item/${entities[0].id}`);
    expect(status).toEqual(200);
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('description');
    expect(body).toHaveProperty('logoUrl');
    expect(body).toHaveProperty('rating');
  });
});
