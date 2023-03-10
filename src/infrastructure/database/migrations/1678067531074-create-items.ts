import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateItems1678067531074 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'items',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'points',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.manager
      .query(`INSERT INTO public.items (id, "name", points) VALUES('9382f552-78d1-4dad-9f27-272166300e37', 'Fiji Water', 14);
    INSERT INTO public.items (id, "name", points) VALUES('1b54777f-d207-4d5d-82ef-2751c89feef7', 'Campbell Soup', 12);
    INSERT INTO public.items (id, "name", points) VALUES('8b561ae9-e79e-4846-a736-cf592b6453d7', 'First Aid Pouch', 10);
    INSERT INTO public.items (id, "name", points) VALUES('c2704891-aaac-43eb-b970-bb71675ec2ab', 'AK47 ', 8);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('items');
  }
}
