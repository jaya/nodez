import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddInfectedAtToSurvivors1678292323531
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'survivors',
      new TableColumn({
        name: 'infected_at',
        type: 'timestamp',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('survivors', 'infected_at');
  }
}
