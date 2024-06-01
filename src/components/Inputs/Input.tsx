import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { MaskedTextInput, MaskedTextInputProps } from "react-native-mask-text";
import { Box } from "../Box";

type InputProps = MaskedTextInputProps & {
  inputType: "normal" | "date" | "value";
  icon_name?: keyof typeof Ionicons.glyphMap;
  icon_size?: number;
  icon_color?: string;
  onChangeText: (text: string, rawText: string) => void;
};

const Input: React.FC<InputProps> = ({
  inputType,
  icon_name,
  icon_size,
  icon_color,
  onChangeText,
  ...rest
}) => {
  return (
    <Box
      flexDirection="row"
      justifyContent="center"
      borderBottomWidth={0.5}
      height={45}
      borderColor="brand_secondary"
    >
      {icon_name && (
        <Box
          flex={1}
          alignItems="center"
          justifyContent="center"
          maxWidth={60}
          borderRightWidth={0.5}
          mr="m"
          borderColor="brand_secondary"
        >
          <Ionicons
            name={icon_name}
            size={icon_size ?? 24}
            color={icon_color ?? "#000"}
          />
        </Box>
      )}
      {inputType === "normal" && (
        <MaskedTextInput
          onChangeText={(text, rawText) => {
            onChangeText(text, rawText);
          }}
          style={{ flex: 1 }}
          {...rest}
        />
      )}
      {inputType === "date" && (
        <MaskedTextInput
          mask="99/99/9999"
          type="date"
          options={{
            dateFormat: "DD/MM/YYYY",
          }}
          onChangeText={(text, rawText) => {
            onChangeText(text, rawText);
          }}
          keyboardType="numeric"
          style={{ flex: 1 }}
          {...rest}
        />
      )}
      {inputType === "value" && (
        <MaskedTextInput
          type="currency"
          options={{
            prefix: "R$ ",
            decimalSeparator: ",",
            groupSeparator: ".",
            precision: 2,
          }}
          style={{ flex: 1 }}
          onChangeText={(text, rawText) => {
            onChangeText(text, rawText);
          }}
          keyboardType="number-pad"
          {...rest}
        />
      )}
    </Box>
  );
};

export { Input };
