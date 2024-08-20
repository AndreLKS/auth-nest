import {MigrationInterface, QueryRunner} from "typeorm";

export class Teste1651008460160 implements MigrationInterface {
    name = 'Teste1651008460160'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clock"."companies" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "inscriptionNumber" character varying NOT NULL, "address" character varying NOT NULL, "onPremiseId" character varying NOT NULL, CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clock"."employees" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "pis" bigint NOT NULL, "userId" integer NOT NULL, "onPremiseId" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "companyId" integer, CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clock"."punches" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "time" TIME NOT NULL, "timeAsMinutes" integer NOT NULL, "ipAddress" character varying, "deviceInfo" character varying, "latitude" character varying, "longitude" character varying, "exported" boolean, "employeeId" integer, CONSTRAINT "PK_ebaa308a35cce0eeab51b314bd2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "clock"."employees" ADD CONSTRAINT "FK_c7b030a4514a003d9d8d31a812b" FOREIGN KEY ("companyId") REFERENCES "clock"."companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clock"."punches" ADD CONSTRAINT "FK_12565da8102324a318e3aff126e" FOREIGN KEY ("employeeId") REFERENCES "clock"."employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clock"."punches" DROP CONSTRAINT "FK_12565da8102324a318e3aff126e"`);
        await queryRunner.query(`ALTER TABLE "clock"."employees" DROP CONSTRAINT "FK_c7b030a4514a003d9d8d31a812b"`);
        await queryRunner.query(`DROP TABLE "clock"."punches"`);
        await queryRunner.query(`DROP TABLE "clock"."employees"`);
        await queryRunner.query(`DROP TABLE "clock"."companies"`);
    }

}
