import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateZipCode1683322111050 implements MigrationInterface {
    name = 'CreateZipCode1683322111050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" RENAME COLUMN "zipdCode" TO "zipCode"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" RENAME COLUMN "zipCode" TO "zipdCode"`);
    }

}
