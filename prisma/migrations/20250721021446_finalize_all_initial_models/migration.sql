/*
  Warnings:

  - You are about to alter the column `grade` on the `stud_mod_performance` table. The data in that column could be lost. The data in that column will be cast from `Char(10)` to `Char(2)`.

*/
-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_offered_by_fkey";

-- DropForeignKey
ALTER TABLE "pre_requisite" DROP CONSTRAINT "pre_requisite_mod_code_fkey";

-- DropForeignKey
ALTER TABLE "pre_requisite" DROP CONSTRAINT "pre_requisite_requisite_fkey";

-- AlterTable
ALTER TABLE "stud_mod_performance" ALTER COLUMN "mark" DROP NOT NULL,
ALTER COLUMN "grade" DROP NOT NULL,
ALTER COLUMN "grade" SET DATA TYPE CHAR(2);

-- AlterTable
ALTER TABLE "student" ALTER COLUMN "mobile_phone" DROP NOT NULL,
ALTER COLUMN "mobile_phone" SET DATA TYPE CHAR(8),
ALTER COLUMN "home_phone" DROP NOT NULL,
ALTER COLUMN "home_phone" SET DATA TYPE CHAR(8);

-- RenameForeignKey
ALTER TABLE "student" RENAME CONSTRAINT "student_crse_code_fkey" TO "student_crse_code_fk";

-- RenameForeignKey
ALTER TABLE "student" RENAME CONSTRAINT "student_nationality_fkey" TO "student_nationality_fk";

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_offered_by_fk" FOREIGN KEY ("offered_by") REFERENCES "department"("dept_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "module" ADD CONSTRAINT "mod_mod_coord_fk" FOREIGN KEY ("mod_coord") REFERENCES "staff"("staff_no") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pre_requisite" ADD CONSTRAINT "pre_requisite_mod_code_fk" FOREIGN KEY ("mod_code") REFERENCES "module"("mod_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pre_requisite" ADD CONSTRAINT "pre_requisite_requisite_fk" FOREIGN KEY ("requisite") REFERENCES "module"("mod_code") ON DELETE NO ACTION ON UPDATE NO ACTION;
