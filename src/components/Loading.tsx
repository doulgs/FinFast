import { ThemeProps } from "@/themes";
import { useTheme } from "@shopify/restyle";
import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";
import { Box } from "./Box";
import { Text } from "./Text";
import { colors } from "@/themes/colors";

type Props = {
  isVisble: boolean;
  message?: string;
};

const Loading: React.FC<Props> = ({
  isVisble,
  message = "Aguarde um momento, Os dados estão sendo carregados...",
}) => {
  const { colors } = useTheme<ThemeProps>();
  return (
    <Modal
      statusBarTranslucent
      transparent={true}
      animationType="fade"
      visible={isVisble}
      style={styles.container}
    >
      <Box flex={1} alignItems="center" justifyContent="center" bg="overlay">
        <View style={styles.card}>
          <ActivityIndicator size={48} color={colors.brand_gradient} />
          <Text textAlign="center">{message}</Text>
        </View>
      </Box>
    </Modal>
  );
};

export { Loading };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 300,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.brand_background,
    borderRadius: 10,
    padding: 20,
    gap: 20,
  },
});
