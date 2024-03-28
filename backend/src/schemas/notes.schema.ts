import { t } from "elysia";

export const noteParams = t.Object({
  id: t.Numeric(),
});

export const noteUserParams = t.Object({
  id_user_notes: t.Numeric(),
});

export const noteBody = t.Object({
  id_user_notes: t.Number(),
  note: t.String(),
});
