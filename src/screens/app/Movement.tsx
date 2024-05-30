import { Box } from "@/components/Box";
import { Button } from "@/components/Button";
import { CategorySelect } from "@/components/CategorySelect";
import { Input } from "@/components/Input";
import { Text } from "@/components/Text";
import { CategoryTypes, useMoviments } from "@/hooks/useMoviments";
import { ThemeProps } from "@/themes";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { useCallback, useState } from "react";
import {
  Keyboard,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const DIMENSION_SCREEN = Dimensions.get("window").height;

const Movement: React.FC = () => {
  const { colors } = useTheme<ThemeProps>();
  const { navigate } = useNavigation();
  const { categoryList, fetchCategories } = useMoviments();

  const [titleMov, setTitleMov] = useState<string>("");
  const [dateMov, setDateMov] = useState<string>("");
  const [valueMov, setValueMov] = useState<string>("");

  const [category, setCategory] = useState<CategoryTypes>({} as CategoryTypes);

  const [installment, setInstallment] = useState<boolean>(false);
  const [numInstallment, setNumInstallment] = useState<string>("");

  useFocusEffect(
    useCallback(() => {
      fetchCategories();
      return () => {};
    }, [])
  );

  return (
    <>
      <ScrollView style={{ backgroundColor: colors.brand_background }}>
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={() => Keyboard.dismiss()}
        >
          <Box p="l" pt="massive" bg="brand_background">
            <Box>
              <Text variant="title" fontSize={24} textAlign="center">
                Preencha os dados {"\n"}
                da conta
              </Text>
              <Box gap="l" mt="xl">
                <Input
                  icon_name="clipboard-outline"
                  icon_color={colors.brand_primary}
                  inputType="normal"
                  value={titleMov}
                  placeholder="Nome da conta a ser inserida..."
                  onChangeText={setTitleMov}
                />
                <Input
                  icon_name="calendar-outline"
                  icon_color={colors.brand_primary}
                  inputType="date"
                  value={dateMov}
                  placeholder="Data da conta a ser inserida..."
                  onChangeText={setDateMov}
                />
                <CategorySelect
                  icon_name="bookmark-outline"
                  data={categoryList}
                  onChange={setCategory}
                />
                <Input
                  icon_name="wallet-outline"
                  icon_color={colors.brand_primary}
                  inputType="value"
                  value={valueMov}
                  placeholder="Valor da conta a ser inserida..."
                  onChangeText={(t, rt) => setValueMov(rt)}
                />
                <BouncyCheckbox
                  size={22}
                  style={{ marginLeft: 20 }}
                  text="Parcelamento"
                  fillColor={colors.brand_primary}
                  innerIconStyle={{ borderWidth: 2, borderRadius: 6 }}
                  textStyle={{
                    fontWeight: "bold",
                    textDecorationLine: "none",
                    color: colors.brand_primary,
                  }}
                  onPress={(isChecked: boolean) => setInstallment(isChecked)}
                />
                {installment && (
                  <Input
                    icon_name="wallet-outline"
                    icon_color={colors.brand_primary}
                    inputType="normal"
                    keyboardType="numeric"
                    value={numInstallment}
                    placeholder="Valor da conta a ser inserida..."
                    onChangeText={setNumInstallment}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </TouchableWithoutFeedback>
      </ScrollView>

      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          gap: 16,
          marginHorizontal: 24,
          marginTop: DIMENSION_SCREEN - 50,
        }}
      >
        <Button
          title="Cancelar"
          variant="outline"
          onPress={() => navigate("Home")}
        />
        <Button
          title="Confirmar"
          variant="solid"
          onPress={() => {
            console.log(category.label);
          }}
        />
      </View>
    </>
  );
};

export default Movement;
