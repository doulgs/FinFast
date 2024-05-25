import { Box } from "@/components/Box";
import { Text } from "@/components/Text";

const Home: React.FC = () => {
  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="center"
      bg="brand_background"
    >
      <Text variant="title">Home</Text>
      <Text variant="subTitle">Home</Text>
      <Text variant="default">Home</Text>
    </Box>
  );
};

export default Home;
