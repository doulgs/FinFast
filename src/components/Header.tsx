import { Icon_QrCode } from "@/assets/icons/Icon_QrCode";
import { Image, ImageBackground } from "react-native";
import { Box } from "./Box";
import { Text } from "./Text";

type InfoProps = {
  visible_number_of_accounts: boolean;
  number_of_accounts?: number;
};

export function Header({
  visible_number_of_accounts,
  number_of_accounts,
}: InfoProps) {
  return (
    <>
      <Box flex={1} maxHeight={200}>
        <ImageBackground
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
          source={require("../assets/images/background.png")}
        >
          <Box
            flex={1}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            p="l"
          >
            <Box>
              <Text variant="title" color="shapes_boxes">
                Olá, Douglas
              </Text>
              <Text variant="default" color="shapes_boxes">
                Mantenha suas contas em dia!
              </Text>
            </Box>
            <Box width={60} height={60} borderRadius={18} overflow="hidden">
              <Image
                resizeMode="contain"
                style={{ width: "100%", height: "100%" }}
                source={{ uri: "https://github.com/doulgs.png" }}
              />
            </Box>
          </Box>
        </ImageBackground>
        {visible_number_of_accounts && (
          <Box
            height={80}
            borderRadius={8}
            marginTop={"n_xxl"}
            marginHorizontal="l"
            bg="brand_secondary"
            alignItems="center"
            justifyContent="center"
            flexDirection="row"
            zIndex={99}
            p="s"
          >
            <Box flex={1} maxWidth={100} alignItems="center">
              <Icon_QrCode size={50} />
            </Box>
            <Box
              flex={1}
              alignItems="center"
              borderLeftWidth={1}
              borderColor="shapes_boxes"
            >
              {number_of_accounts === 0 ? (
                <Text textAlign="center" variant="default" color="shapes_boxes">
                  Parabéns nenhuma contas {"\n"}
                  cadastradas para pagar
                </Text>
              ) : (
                <Text textAlign="center" variant="default" color="shapes_boxes">
                  Você tem {number_of_accounts} contas {"\n"}
                  cadastradas para pagar
                </Text>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}
