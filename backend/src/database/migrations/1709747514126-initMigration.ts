import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1709747514126 implements MigrationInterface {
    name = 'InitMigration1709747514126'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" ADD "buyLink" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "buyLink"`);
    }

}
