/*
  Warnings:

  - A unique constraint covering the columns `[id_user_student]` on the table `student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "student_id_user_student_key" ON "student"("id_user_student");
