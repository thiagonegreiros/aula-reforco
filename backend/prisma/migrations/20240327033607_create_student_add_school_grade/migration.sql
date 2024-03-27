/*
  Warnings:

  - Added the required column `school_grade` to the `student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "student" ADD COLUMN     "school_grade" TEXT NOT NULL;
