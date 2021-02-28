import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import slugify from 'slugify';
import { IMovie } from 'src/movies/interfaces';
import * as request from 'supertest';
import { Repository } from 'typeorm';

import { Movie } from '../src/entity/movie.entity';
import { MoviesModule } from '../src/movies/module';
import * as initData from './data/init.json';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<Movie>;
  let entities: Movie[];
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MoviesModule, TypeOrmModule.forRoot()],
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

  it('/item/{slug} (GET)', async () => {
    const slug = slugify(entities[0].title, { lower: true });
    const { status, body } = await request(app.getHttpServer()).get(`/item/${slug}`);
    expect(status).toEqual(200);
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('description');
    expect(body).toHaveProperty('logoUrl');
    expect(body).toHaveProperty('rating');
  });
});
