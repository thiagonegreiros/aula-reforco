export function transformDate(dateTransform: string | Date) {
  if (dateTransform && typeof dateTransform === "string") {
    return new Date(dateTransform);
  }

  return dateTransform;
}
