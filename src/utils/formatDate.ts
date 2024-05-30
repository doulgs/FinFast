import { format, parseISO } from "date-fns";

export const formatDateTime = (dateTimeString: string): string => {
  const date = parseISO(dateTimeString);
  return format(date, "dd/MM/yyyy");
};

export function formatDateTimeForSupabase(inputDate: string): string {
  // Divide a string da data em partes
  const parts = inputDate.split("/");

  // Verifica se a data é válida
  if (parts.length !== 3) {
    throw new Error("Formato de data inválido");
  }

  // Reordena as partes para o formato 'yyyy-MM-dd'
  const [day, month, year] = parts;
  return `${year}-${month}-${day}`;
}

export function convertDateToISO(inputDate: string): string {
  const parts = inputDate.split("/");
  if (parts.length !== 3) {
    throw new Error("Formato de data inválido");
  }
  const [day, month, year] = parts;
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}
