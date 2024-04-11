import { CLASS_TIME, DAYS_WEEK } from "./constants";

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

export function getAge(dateString: string) {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

export const normalizePhoneNumber = (value: string | undefined) => {
  if (!value) return "";

  return value
    .replace(/[\D]/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(-\d{4})(\d+?)/, "$1");
};

export function getClassTimeById(id: number) {
  const classObj = CLASS_TIME.find((item) => item.id === id);
  return classObj ? classObj.name : null;
}

export function getShortWeekdayNames(idsString: string) {
  if (!idsString) return "";

  const ids = idsString.split(",").map((id) => parseInt(id.trim(), 10));
  const weekdays = DAYS_WEEK.filter((day) => ids.includes(day.id));
  const shortNames = weekdays.map((day) => day.name.slice(0, 3));
  return shortNames.join(", ");
}
