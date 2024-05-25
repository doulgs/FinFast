import { createTheme } from "@shopify/restyle";
import { colors } from "./colors";
import { spacing } from "./spacing";
import { textVariants } from "./textVariants";

const Theme = createTheme({
  colors,
  spacing,
  textVariants,
});

type ThemeProps = typeof Theme;

export { Theme, ThemeProps };
