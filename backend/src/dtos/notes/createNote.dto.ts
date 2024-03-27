import { t } from "elysia";

export interface CreateNoteDto {
  id_user_notes: number;
  note: string;
}

export const createNoteType = t.Object({
  id_user_notes: t.Number(),
  note: t.String(),
});
