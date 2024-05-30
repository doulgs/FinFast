import { ParcelTypes } from "@/hooks/useMoviments";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Box } from "./Box";
import { Text } from "./Text";

type DropdownProps = {
  data: ParcelTypes[];
  onChange: (item: ParcelTypes) => void;
  icon_name?: keyof typeof Ionicons.glyphMap;
  icon_size?: number;
  icon_color?: string;
};

const ParcelSelect: React.FC<DropdownProps> = ({
  data,
  onChange,
  icon_name,
  icon_size,
  icon_color,
}) => {
  const [value, setValue] = useState<string | null>(null);

  function handleOnChange(item: ParcelTypes) {
    setValue(item.description);
    onChange(item);
  }

  const renderItem = (item: ParcelTypes) => (
    <Box flexDirection="row" justifyContent="space-between" p="m">
      <Text variant="default">{item.description}</Text>
      {item.description === value && (
        <Ionicons
          name="checkmark"
          size={icon_size ?? 24}
          color={icon_color ?? "#000000"}
        />
      )}
    </Box>
  );

  return (
    <Box
      flexDirection="row"
      borderBottomWidth={0.5}
      height={45}
      borderColor="brand_secondary"
    >
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
      <Dropdown
        data={data}
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        maxHeight={250}
        closeModalWhenSelectedItem
        labelField="description"
        valueField="description"
        placeholder="Quantidade de parcelas..."
        value={value}
        onChange={handleOnChange}
        renderItem={renderItem}
      />
    </Box>
  );
};

export { ParcelSelect };

const styles = StyleSheet.create({
  dropdown: {
    flex: 1,
    maxHeight: 50,
    backgroundColor: "white",
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "#585666",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "#000000",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
