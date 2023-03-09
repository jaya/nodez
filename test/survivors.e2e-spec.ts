import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { SurvivorsModule } from '../src/survivors/survivors.module';
import { ConfigModule } from '@nestjs/config';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Gender, Survivor } from '@/survivors/entities/survivor.entity';
import { Repository } from 'typeorm';
import { databaseConfig } from './connection';
import { InventoryItem } from '@/survivors/entities/inventory-item.entity';
import { Item } from '@/items/entities/item.entity';

describe('SurvivorsController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<Survivor>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env.test',
        }),
        TypeOrmModule.forRoot({
          ...databaseConfig,
          entities: [Survivor, InventoryItem, Item],
        }),
        SurvivorsModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    repository = moduleFixture.get<Repository<Survivor>>(
      getRepositoryToken(Survivor),
    );

    await repository.delete({});
  });

  afterAll(async () => {
    await app.close();
  });

  describe('PATCH /survivors/:id', () => {
    it('should be able to update an existing survivor', async () => {
      const survivor = repository.create({
        name: 'any_name',
        age: 18,
        gender: Gender.MALE,
        latitude: 1,
        longitude: 1,
      });

      await repository.save(survivor);

      const id = survivor.id;

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

  describe('/GET survivors', () => {
    it('should be able to get survivors', async () => {
      const data = {
        name: 'any_name',
        age: 18,
        gender: Gender.MALE,
        latitude: 1,
        longitude: 1,
      };

      const survivor = repository.create(data);

      await repository.save(survivor);

      const response = await request(app.getHttpServer()).get('/survivors');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([expect.objectContaining(data)]);
    });

    it('should be able to get survivors filter by name', async () => {
      const data = {
        name: 'any_name',
        age: 18,
        gender: Gender.MALE,
        latitude: 1,
        longitude: 1,
      };

      const survivor = repository.create(data);

      await repository.save(survivor);

      const response = await request(app.getHttpServer())
        .get('/survivors')
        .query({ search: 'any_name' });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([expect.objectContaining(data)]);
    });
  });
});
