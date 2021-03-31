import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1617219164399 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // oque eu quero que seja executado na criação do banco de dados
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [{
          name: 'id',
          type: 'varchar',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'provider',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'date',
          type: 'timestamp with time zone',
          isNullable: false,
        },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // callback -> desfazer o método up
    await queryRunner.dropTable('appointment');
  }
}
