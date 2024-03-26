/*
  Warnings:

  - You are about to drop the column `user_id` on the `student` table. All the data in the column will be lost.
  - Added the required column `id_user_student` to the `student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "student" DROP CONSTRAINT "student_user_id_fkey";

-- AlterTable
ALTER TABLE "student" DROP COLUMN "user_id",
ADD COLUMN     "id_user_student" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "notes" (
    "id" SERIAL NOT NULL,
    "note" TEXT NOT NULL,
    "id_user_notes" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_id_user_student_fkey" FOREIGN KEY ("id_user_student") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_id_user_notes_fkey" FOREIGN KEY ("id_user_notes") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
