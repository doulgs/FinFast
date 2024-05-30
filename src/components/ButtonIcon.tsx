import { ThemeProps } from "@/themes";
import { Ionicons } from "@expo/vector-icons";
import {
  SpacingProps,
  VariantProps,
  createRestyleComponent,
  createVariant,
  spacing,
  useTheme,
} from "@shopify/restyle";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Text } from "./Text";

type BoxCustomProps = SpacingProps<ThemeProps> &
  VariantProps<ThemeProps, "buttonVariants">;

const Box = createRestyleComponent<BoxCustomProps, ThemeProps>([
  spacing,
  createVariant({ themeKey: "buttonVariants" }),
]);

type Props = BoxCustomProps &
  TouchableOpacityProps & {
    title: string;
    icon_name: keyof typeof Ionicons.glyphMap;
    icon_size?: number;
    icon_color?: string;
  };

export function ButtonIcon({
  title,
  icon_name,
  icon_size,
  icon_color,
  onPress,
  ...rest
}: Props) {
  const theme = useTheme<ThemeProps>();

  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={onPress}>
      <Box {...rest}>
        <Ionicons
          name={icon_name}
          size={icon_size ?? 18}
          color={icon_color ?? theme.colors.actions_delete}
        />
        <Text color="actions_delete" variant="button_icon_outline">
          {title}
        </Text>
      </Box>
    </TouchableOpacity>
  );
}
