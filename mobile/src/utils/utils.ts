export function formatDate(timestamp: string): string {
  const dateObject = new Date(timestamp);
  const day = dateObject.getDate().toString().padStart(2, "0");
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObject.getFullYear().toString();

  return `${day}/${month}/${year}`;
}

export function formatDateDayAndWeek(timestamp: string): string {
  const daysOfWeek = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sabádo",
  ];
  const dateObject = new Date(timestamp);
  const day = dateObject.getDate().toString().padStart(2, "0");
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const dayOfWeek = daysOfWeek[dateObject.getDay()];

  return `${day}/${month} - ${dayOfWeek}`;
}

export function getInitalName(nome: string): string {
  const name = nome.trim().split(" ");

  if (name.length === 0) {
    return "";
  }

  const firstLetter = name[0][0];
  const secondLetter = name[0][1] || "";

  const initialsName = firstLetter.toUpperCase() + secondLetter.toUpperCase();

  return initialsName;
}
