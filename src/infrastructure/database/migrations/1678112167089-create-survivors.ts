import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSurvivors1678112167089 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'survivors',
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
            name: 'age',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'gender',
            type: 'enum',
            enum: ['MALE', 'FEMALE'],
            isNullable: false,
          },
          {
            name: 'latitude',
            type: 'double precision',
            isNullable: false,
          },
          {
            name: 'longitude',
            type: 'double precision',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('survivors');
  }
}
