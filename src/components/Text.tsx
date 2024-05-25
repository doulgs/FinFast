import { createText, TextProps } from "@shopify/restyle";
import React from "react";
import { ThemeProps } from "../themes";

const TextStyled = createText<ThemeProps>();

interface Props extends TextProps<ThemeProps> {
  children: React.ReactNode;
}

export function Text({ children, ...rest }: Props) {
  return <TextStyled {...rest}>{children}</TextStyled>;
}
