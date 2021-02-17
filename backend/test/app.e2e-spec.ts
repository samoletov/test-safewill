import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { MoviesModule } from '../src/movies.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MoviesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/list (GET)', () => {
    return request(app.getHttpServer()).get('/list').expect(200);
  });
});
