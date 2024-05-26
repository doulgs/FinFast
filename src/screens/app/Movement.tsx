import { Box } from "@/components/Box";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native";

const Movement: React.FC = () => {
  const { navigate } = useNavigation();
  return (
    <Box flex={1} pt="enormous" bg="brand_background">
      <Box flex={1}>
        <Text variant="title" fontSize={24} textAlign="center">
          Preencha os dados {"\n"}
          da conta
        </Text>
        <Box flex={1}>
          <TextInput />
        </Box>
      </Box>
      <Box position="absolute" bottom={0} flexDirection="row" gap="s" m={"m"}>
        <Button
          title="Cancelar"
          variant="outline"
          onPress={() => navigate("Home")}
        ></Button>
        <Button title="Confirmar" variant="solid"></Button>
      </Box>
    </Box>
  );
};

export default Movement;
