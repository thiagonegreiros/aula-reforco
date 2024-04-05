-- AlterTable
ALTER TABLE "student" ADD COLUMN     "days_of_week" TEXT,
ALTER COLUMN "class_time" DROP NOT NULL,
ALTER COLUMN "qty_days_peer_week" DROP NOT NULL,
ALTER COLUMN "active" SET DEFAULT true,
ALTER COLUMN "school_grade" DROP NOT NULL;
