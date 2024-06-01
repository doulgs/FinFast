import { Box } from "@/components/Box";
import { Button } from "@/components/Buttons/Button";
import { InputSolid } from "@/components/Inputs/InputSolid";
import { Text } from "@/components/Text";
import { useBottomSheet } from "@/contexts/BottomSheetContext";
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
} from "react-native";

const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

const Authentication: React.FC = () => {
  const { openBottomSheet, closeBottomSheet } = useBottomSheet();

  return (
    <>
      <ScrollView style={styles.scroll}>
        <ImageBackground
          style={styles.imageBackground}
          source={require("../../assets/images/background-auth.png")}
        >
          <Box flex={1} alignItems="center" justifyContent="flex-end">
            <Image
              style={styles.image}
              source={require("../../assets/images/Logo.png")}
            />
          </Box>
          <Box flex={2} gap="l" justifyContent="center" paddingHorizontal="xxl">
            <InputSolid
              placeholder="Empresa"
              icon_name="add"
              inputType="normal"
              onChangeText={() => {}}
            />
            <InputSolid
              placeholder="Usuário"
              icon_name="add"
              inputType="normal"
              onChangeText={() => {}}
            />
            <Box
              flex={1}
              maxHeight={50}
              alignItems="center"
              justifyContent="center"
            >
              <Button title="Acessar" />
            </Box>
          </Box>
          <Text textAlign="center" fontSize={16} m={"m"}>
            create by @DevCoffye
          </Text>
        </ImageBackground>
      </ScrollView>
    </>
  );
};

export default Authentication;

export const styles = StyleSheet.create({
  scroll: {
    height: HEIGHT,
    width: WIDTH,
  },
  imageBackground: {
    flex: 1,
    height: HEIGHT,
    width: WIDTH,
  },
  image: {
    height: 200,
    width: 200,
    resizeMode: "contain",
  },
});
