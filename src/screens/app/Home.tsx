import { Box } from "@/components/Box";
import { DetailsMoviments } from "@/components/DetailsMoviments";
import { Header } from "@/components/Header";
import { Text } from "@/components/Text";
import { useBottomSheet } from "@/contexts/BottomSheetContext";
import { useMoviments } from "@/hooks/useMoviments";
import { formatCurrency, formatDateTime, getMonthName } from "@/utils";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { FlatList, Pressable } from "react-native";

const Home: React.FC = () => {
  const { openBottomSheet, closeBottomSheet } = useBottomSheet();
  const { listMoviments, fetchMoviments, updateMoviment, deleteMoviment } =
    useMoviments();

  useFocusEffect(
    useCallback(() => {
      fetchMoviments();
      return () => {};
    }, [fetchMoviments, openBottomSheet])
  );

  return (
    <Box flex={1} bg="brand_background">
      <Header number_of_accounts={listMoviments.length} />
      <Box flex={1} paddingHorizontal="l" pt="xxxl">
        <FlatList
          data={listMoviments}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <Box borderBottomWidth={1} paddingVertical="l" marginBottom="l">
              <Text variant="title">
                Movimentos lançados em {getMonthName()}
              </Text>
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
                    <Text variant="subTitle" fontSize={14}>
                      Vence em {formatDateTime(moviment.date)}
                    </Text>
                  </Box>
                </Box>

                <Box>
                  <Text variant="title" fontSize={16} textAlign="right">
                    {formatCurrency(moviment.value)}
                  </Text>
                  <Text variant="default" fontSize={14} textAlign="right">
                    Alimentação
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

export default Home;
