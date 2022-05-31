import { MigrationInterface, QueryRunner } from "typeorm";

export class addedAddressEntity1653397513505 implements MigrationInterface {
    name = 'addedAddressEntity1653397513505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addreses" ("address_uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying NOT NULL, "houseNumber" integer NOT NULL, "city" character varying NOT NULL, "userUserUuid" uuid, CONSTRAINT "REL_e08dbbe7d5f2606f2c1fd6087d" UNIQUE ("userUserUuid"), CONSTRAINT "PK_e6b547944a06fd7f23b49a3da3e" PRIMARY KEY ("address_uuid"))`);
        await queryRunner.query(`ALTER TABLE "addreses" ADD CONSTRAINT "FK_e08dbbe7d5f2606f2c1fd6087df" FOREIGN KEY ("userUserUuid") REFERENCES "users"("userUuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addreses" DROP CONSTRAINT "FK_e08dbbe7d5f2606f2c1fd6087df"`);
        await queryRunner.query(`DROP TABLE "addreses"`);
    }

}
