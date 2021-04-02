import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1617305212239 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // oque eu quero que seja executado na criação do banco de dados
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [{
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true,
        },
        {
          name: 'password',
          type: 'varchar',
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
    // callback -> desfazer o método up
    await queryRunner.dropTable('users');
  }
}
