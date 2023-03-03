import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { SurvivorsModule } from '../src/survivors/survivors.module';

describe('SurvivorsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SurvivorsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/survivors (POST)', () => {
    return request(app.getHttpServer())
      .post('/survivors')
      .send({ name: 'john', age: '1', gender: 'male' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body.name).toEqual('john');
      });
  });
});
