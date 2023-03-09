import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { SurvivorsModule } from '@/survivors/survivors.module';
import { ConfigModule } from '@nestjs/config';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Gender, Survivor } from '@/survivors/entities/survivor.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { InventoryItem } from '@/survivors/entities/inventory-item.entity';
import { Item } from '@/items/entities/item.entity';
import { Repository } from 'typeorm';
import { ItemsModule } from '@/items/items.module';

describe('SurvivorsController (e2e)', () => {
  let app: INestApplication;
  let survivorsRepository: Repository<Survivor>;
  let itemsRepository: Repository<Item>;

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
        ItemsModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    survivorsRepository = moduleFixture.get<Repository<Survivor>>(
      getRepositoryToken(Survivor),
    );

    itemsRepository = moduleFixture.get<Repository<Item>>(
      getRepositoryToken(Item),
    );
  });

  describe('POST /survivors', () => {
    it('should be able to create a survivor', async () => {
      const item = await itemsRepository.save({
        name: 'Fiji Water',
        points: 14,
      });

      const body = {
        name: 'any_name',
        age: 18,
        gender: Gender.MALE,
        latitude: 1,
        longitude: 1,
        inventoryItems: [{ itemId: item.id, quantity: 10 }],
      };

      const response = await request(app.getHttpServer())
        .post(`/survivors`)
        .send(body);

      expect(response.statusCode).toBe(HttpStatus.CREATED);
      expect(response.body).toMatchObject(body);
    });
  });

  describe('PATCH /survivors/:id', () => {
    it('should be able to update an existing survivor', async () => {
      const survivor = await survivorsRepository.save({
        name: 'any_name',
        age: 18,
        gender: Gender.MALE,
        latitude: 1,
        longitude: 1,
      });

      const body = {
        latitude: 2,
        longitude: 2,
      };

      const response = await request(app.getHttpServer())
        .patch(`/survivors/${survivor.id}`)
        .send(body);

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toMatchObject(body);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
