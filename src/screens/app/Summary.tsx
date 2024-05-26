import { MovimentTypes } from "@/@types/moviments";
import { Box } from "@/components/Box";
import { DetailsMoviments } from "@/components/DetailsMoviments";
import { Header } from "@/components/Header";
import { Text } from "@/components/Text";
import { useBottomSheet } from "@/contexts/BottomSheetContext";
import { supabase } from "@/services/supabase";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDateTime } from "@/utils/formatDate";
import { getMonthName } from "@/utils/getMonthName";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Alert, FlatList, Pressable } from "react-native";

const Summary: React.FC = () => {
  const { openBottomSheet, closeBottomSheet } = useBottomSheet();

  const [listMoviments, setListMoviments] = useState<MovimentTypes[]>([]);

  const fetchMoviments = async () => {
    const { data, error } = await supabase
      .from("moviments")
      .select("*")
      .eq("wasPaid", "TRUE")
      .order("id", { ascending: false });
    if (error) {
      Alert.alert("Error", error.message);
    } else {
      setListMoviments(data);
    }
  };

  const updateMoviment = async (id: number, wasPaid: boolean) => {
    const { error } = await supabase
      .from("moviments")
      .update({ wasPaid })
      .match({ id });
    if (error) {
      Alert.alert("Error", error.message);
    } else {
      closeBottomSheet();
      await fetchMoviments();
    }
  };

  const deleteMoviment = async (id: number) => {
    const { error } = await supabase.from("moviments").delete().match({ id });
    if (error) {
      Alert.alert("Error", error.message);
    } else {
      closeBottomSheet();
      await fetchMoviments();
    }
  };

  useFocusEffect(
    useCallback(() => {
      //setLoading(true);
      fetchMoviments();
      //setLoading(true);
      return () => {};
    }, [openBottomSheet])
  );

  return (
    <Box flex={1} bg="brand_background">
      <Header />
      <Box flex={1} paddingHorizontal="l" pt="s">
        <FlatList
          data={listMoviments}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <Box borderBottomWidth={1} paddingVertical="l" marginBottom="l">
              <Text variant="title">Extratos de {getMonthName()}</Text>
            </Box>
          )}
          ItemSeparatorComponent={() => (
            <Box marginVertical="s" height={1} backgroundColor="overlay" />
          )}
          renderItem={({ item: moviment }) => (
            <Pressable
              onPress={() =>
                openBottomSheet(
                  <DetailsMoviments
                    moviment={moviment}
                    updateMoviment={updateMoviment}
                    deleteMoviment={deleteMoviment}
                  />
                )
              }
            >
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                marginVertical="s"
              >
                <Box flex={1}>
                  <Text variant="title" fontSize={18}>
                    {moviment.description}
                  </Text>
                  <Box
                    flexDirection="row"
                    alignItems="center"
                    gap="s"
                    marginTop="s"
                    marginLeft="s"
                  >
                    <AntDesign name="clockcircleo" size={14} color="black" />
                    <Text
                      variant="subTitle"
                      fontSize={14}
                      textDecorationLine="line-through"
                    >
                      Venceu em {formatDateTime(moviment.date)}
                    </Text>
                  </Box>
                </Box>

                <Box>
                  <Text variant="title" fontSize={16}>
                    {formatCurrency(moviment.value)}
                  </Text>
                </Box>
              </Box>
            </Pressable>
          )}
        />
      </Box>
    </Box>
  );
};

export default Summary;
