export function getMonthName(): string {
  // Array com os nomes dos meses
  const monthNames: string[] = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  // Obtém o mês atual (0-11)
  const currentMonthIndex: number = new Date().getMonth();

  // Retorna o nome do mês correspondente
  return monthNames[currentMonthIndex];
}
