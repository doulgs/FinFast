import { createTheme } from "@shopify/restyle";
import { colors } from "./colors";
import { spacing } from "./spacing";
import { textVariants } from "./textVariants";
import { buttonVariants } from "./buttonVariants";
import { inputVariants } from "./inputVariants";

const Theme = createTheme({
  colors,
  spacing,
  textVariants,
  buttonVariants,
  inputVariants,
});

type ThemeProps = typeof Theme;

export { Theme, ThemeProps };
