import { Box } from "@/components/Box";
import { Button } from "@/components/Button";
import { CategorySelect } from "@/components/CategorySelect";
import { Input } from "@/components/Input";
import { ParcelSelect } from "@/components/ParcelSelect";
import { Text } from "@/components/Text";
import { CategoryTypes, ParcelTypes, useMoviments } from "@/hooks/useMoviments";
import { ThemeProps } from "@/themes";
import { convertDateToISO, convertToFloatWithCents } from "@/utils";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { addMonths, formatISO, parseISO } from "date-fns";
import { useCallback, useState } from "react";
import {
  Dimensions,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const DIMENSION_SCREEN = Dimensions.get("window").height;

const Movement: React.FC = () => {
  const { colors } = useTheme<ThemeProps>();
  const { navigate } = useNavigation();
  const {
    categoryList,
    fetchCategories,
    parcelList,
    fetchParcel,
    insertMoviment,
  } = useMoviments();

  const [titleMov, setTitleMov] = useState<string>("");
  const [dateMov, setDateMov] = useState<string>("");
  const [valueMov, setValueMov] = useState<string>("");

  const [category, setCategory] = useState<CategoryTypes>({} as CategoryTypes);
  const [parcel, setParcel] = useState<ParcelTypes>({} as ParcelTypes);

  const [wasPaid, setWasPaid] = useState<boolean>(false);
  const [installment, setInstallment] = useState<boolean>(false);

  async function clean() {
    setTitleMov("");
    setDateMov("");
    setValueMov("");
    setCategory({} as CategoryTypes);
    setParcel({} as ParcelTypes);
    setWasPaid(false);
    setInstallment(false);
  }

  async function handleInsertMoviment() {
    try {
      let isoDate = convertDateToISO(dateMov);
      let currentDate = parseISO(isoDate);

      if (installment) {
        for (let i = 0; i < parcel.value; i++) {
          await insertMoviment({
            description: titleMov,
            value: convertToFloatWithCents(valueMov),
            date: formatISO(currentDate),
            wasPaid: wasPaid,
            category: category.label,
            id_user: "4be6967b-873c-4533-a1a7-ec07d3696697",
            id_organization: "e4b67b56-28e3-4002-ace2-d800e8013a72",
          });
          currentDate = addMonths(currentDate, 1);
        }
      } else {
        await insertMoviment({
          description: titleMov,
          value: convertToFloatWithCents(valueMov),
          date: formatISO(currentDate),
          wasPaid: wasPaid,
          category: category.label,
          id_user: "4be6967b-873c-4533-a1a7-ec07d3696697",
          id_organization: "e4b67b56-28e3-4002-ace2-d800e8013a72",
        });
      }
    } catch (error) {
      console.warn(error);
    }
    clean();
    navigate("Home");
  }

  useFocusEffect(
    useCallback(() => {
      fetchCategories();
      fetchParcel();
      return () => {
        clean();
      };
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
                  onChangeText={(t, rt) => setTitleMov(rt)}
                />
                <Input
                  icon_name="calendar-outline"
                  icon_color={colors.brand_primary}
                  inputType="date"
                  value={dateMov}
                  placeholder="Data da conta a ser inserida..."
                  onChangeText={(t) => setDateMov(t)}
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
                  text="A conta já esta paga."
                  fillColor={colors.brand_primary}
                  innerIconStyle={{ borderWidth: 2, borderRadius: 6 }}
                  textStyle={{
                    fontWeight: "bold",
                    textDecorationLine: "none",
                    color: colors.brand_primary,
                  }}
                  onPress={(isChecked: boolean) => setWasPaid(isChecked)}
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
                  <ParcelSelect
                    icon_name="duplicate-outline"
                    data={parcelList}
                    onChange={setParcel}
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
          onPress={() => {
            clean(), navigate("Home");
          }}
        />
        <Button
          title="Confirmar"
          variant="solid"
          onPress={handleInsertMoviment}
        />
      </View>
    </>
  );
};

export default Movement;
