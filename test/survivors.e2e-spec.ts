import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { SurvivorsModule } from '../src/survivors/survivors.module';
import { ConfigModule } from '@nestjs/config';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Gender, Survivor } from '@/survivors/entities/survivor.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { InventoryItem } from '@/survivors/entities/inventory-item.entity';
import { Item } from '@/items/entities/item.entity';
import { Repository } from 'typeorm';

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
          type: 'postgres',
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT),
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          namingStrategy: new SnakeNamingStrategy(),
          entities: [Survivor, InventoryItem, Item],
          synchronize: true,
        }),
        SurvivorsModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    repository = moduleFixture.get<Repository<Survivor>>(
      getRepositoryToken(Survivor),
    );
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
});
