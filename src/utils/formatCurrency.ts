export function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function convertToFloatWithCents(input: string): number {
  // Verifica se a entrada tem pelo menos 3 dígitos
  if (input.length < 3) {
    throw new Error("Formato de entrada inválido");
  }

  // Insere um ponto decimal antes dos dois últimos dígitos
  const length = input.length;
  const result =
    input.substring(0, length - 2) + "." + input.substring(length - 2);

  // Converte a string resultante para um float
  const floatValue = parseFloat(result);

  // Verifica se a conversão resultou em um número válido
  if (isNaN(floatValue)) {
    throw new Error("Não foi possível converter a entrada para float");
  }

  return floatValue;
}
