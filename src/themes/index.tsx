import { createTheme } from "@shopify/restyle";
import { colors } from "./colors";
import { spacing } from "./spacing";
import { textVariants } from "./textVariants";
import { buttonVariants } from "./buttonVariants";

const Theme = createTheme({
  colors,
  spacing,
  textVariants,
  buttonVariants,
});

type ThemeProps = typeof Theme;

export { Theme, ThemeProps };
