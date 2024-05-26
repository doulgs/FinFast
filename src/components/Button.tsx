import {
  SpacingProps,
  VariantProps,
  createRestyleComponent,
  createVariant,
  spacing,
} from "@shopify/restyle";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Text } from "./Text";
import { ThemeProps } from "@/themes";

type BoxCustomProps = SpacingProps<ThemeProps> &
  VariantProps<ThemeProps, "buttonVariants">;

const Box = createRestyleComponent<BoxCustomProps, ThemeProps>([
  spacing,
  createVariant({ themeKey: "buttonVariants" }),
]);

type Props = BoxCustomProps &
  TouchableOpacityProps & {
    title: string;
  };

export function Button({ title, onPress, ...rest }: Props) {
  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={onPress}>
      <Box {...rest}>
        <Text
          variant={rest.variant === "solid" ? "button_solid" : "button_outline"}
        >
          {title}
        </Text>
      </Box>
    </TouchableOpacity>
  );
}
