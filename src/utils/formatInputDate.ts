export const formatInputDate = (input: string): string => {
  // Remova todos os caracteres não numéricos
  const cleaned = input.replace(/[^\d]/g, "");

  // Divida a string em partes de dia, mês e ano
  const day = cleaned.slice(0, 2);
  const month = cleaned.slice(2, 4);
  const year = cleaned.slice(4, 8);

  let formatted = day;
  if (month) formatted += `/${month}`;
  if (year) formatted += `/${year}`;

  return formatted;
};

/*
Exemplo de como usar

const formatterDate = (text: string) => {
  const formattedText = formatInputDate(text);
  setDateMov(formattedText);
};

 */
