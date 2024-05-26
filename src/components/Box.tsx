import { createBox, BoxProps } from "@shopify/restyle";
import React from "react";
import { ThemeProps } from "../themes";

const BoxStyled = createBox<ThemeProps>();

interface Props extends BoxProps<ThemeProps> {
  children?: React.ReactNode;
}

export function Box({ children, ...rest }: Props) {
  return <BoxStyled {...rest}>{children}</BoxStyled>;
}
