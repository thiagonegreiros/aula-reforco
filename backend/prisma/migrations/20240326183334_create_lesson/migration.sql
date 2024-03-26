-- CreateTable
CREATE TABLE "lesson" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "id_user_lesson" INTEGER NOT NULL,
    "id_subjects_lesson" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lesson_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lesson" ADD CONSTRAINT "lesson_id_user_lesson_fkey" FOREIGN KEY ("id_user_lesson") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson" ADD CONSTRAINT "lesson_id_subjects_lesson_fkey" FOREIGN KEY ("id_subjects_lesson") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
