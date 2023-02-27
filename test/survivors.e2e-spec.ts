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

  describe('PATCH /survivors/:id', () => {
    it('should be able to update an existing survivor', async () => {
      // TO-DO add here using the create function, mocked for now
      const id = 'any_id';
      const body = {
        latitude: 2,
        longitude: 2,
      };

      const response = await request(app.getHttpServer())
        .patch(`/survivors/${id}`)
        .send(body);

      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject(body);
    });
  });
});
