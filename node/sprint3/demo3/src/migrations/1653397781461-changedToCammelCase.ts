import { MigrationInterface, QueryRunner } from "typeorm";

export class changedToCammelCase1653397781461 implements MigrationInterface {
    name = 'changedToCammelCase1653397781461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addreses" RENAME COLUMN "address_uuid" TO "addressUuid"`);
        await queryRunner.query(`ALTER TABLE "addreses" RENAME CONSTRAINT "PK_e6b547944a06fd7f23b49a3da3e" TO "PK_2c42fdd74fcc0625520a4a7f1a6"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addreses" RENAME CONSTRAINT "PK_2c42fdd74fcc0625520a4a7f1a6" TO "PK_e6b547944a06fd7f23b49a3da3e"`);
        await queryRunner.query(`ALTER TABLE "addreses" RENAME COLUMN "addressUuid" TO "address_uuid"`);
    }

}
