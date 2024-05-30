import { useBottomSheet } from "@/contexts/BottomSheetContext";
import { MovimentTypes } from "@/hooks/useMoviments";
import { formatCurrency } from "@/utils/formatCurrency";
import { Box } from "./Box";
import { Button } from "./Button";
import { ButtonIcon } from "./ButtonIcon";
import { Text } from "./Text";

interface ActionsProps {
  moviment: MovimentTypes;
  updateMoviment: (id: number, wasPaid: boolean) => void;
  deleteMoviment: (id: number) => void;
}
export function DetailsMoviments({
  moviment,
  updateMoviment,
  deleteMoviment,
}: ActionsProps) {
  const { closeBottomSheet } = useBottomSheet();
  const truncateDescription = (description: string) => {
    return description.length > 20
      ? description.substring(0, 17) + "..."
      : description;
  };

  return (
    <Box flex={1} margin="l">
      <Box flex={1} alignItems="center" justifyContent="center">
        <Text variant="subTitle" textAlign="center" fontSize={24}>
          A conta{" "}
          <Text variant="title" fontSize={26}>
            {truncateDescription(moviment.description)}
          </Text>{" "}
          {`\n`}
          no valor de{" "}
          <Text variant="title" fontSize={26}>
            {formatCurrency(moviment.value)}
          </Text>{" "}
          {`\n`}
          foi pago ?
        </Text>
      </Box>
      <Box flex={2}>
        <Box flexDirection="row" mt="l" mb="m" gap="m">
          <Button
            title="Cancelar"
            variant="outline"
            onPress={() => closeBottomSheet()}
          />
          <Button
            title="Confirmar"
            variant="solid"
            onPress={() => {
              updateMoviment(moviment.id, !moviment.wasPaid),
                closeBottomSheet();
            }}
          />
        </Box>
        <ButtonIcon
          title="Apagar conta"
          variant="outline_icon"
          icon_name="trash"
          onPress={() => {
            deleteMoviment(moviment.id);
            closeBottomSheet();
          }}
        />
      </Box>
    </Box>
  );
}
