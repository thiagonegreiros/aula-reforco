export function formatDate(timestamp: string): string {
  const dateObject = new Date(timestamp);
  const day = dateObject.getDate().toString().padStart(2, "0");
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObject.getFullYear().toString();

  return `${day}/${month}/${year}`;
}
