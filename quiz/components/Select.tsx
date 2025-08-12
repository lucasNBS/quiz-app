import { DefaultTheme } from "@/style/theme";
import React from "react";
import {
  Control,
  FieldValues,
  Path,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

type SelectProps<T extends FieldValues> = {
  name: Path<T>;
  setValue: UseFormSetValue<T>;
  control: Control<T>;
  options: { text: string; value: any }[];
};

export function Select<T extends FieldValues>(props: SelectProps<T>) {
  const selectedOption = useWatch({
    name: props.name,
    control: props.control,
  });

  return (
    <>
      <Dropdown
        style={styles.dropdown}
        data={props.options}
        search={false}
        placeholder="Selecione uma opção"
        placeholderStyle={styles.placeholder}
        itemTextStyle={styles.optionText}
        selectedTextStyle={styles.optionText}
        itemContainerStyle={styles.option}
        activeColor={DefaultTheme.DARK_800}
        value={selectedOption}
        labelField={"text"}
        valueField={"value"}
        onChange={(item) => {
          props.setValue(props.name, {
            text: item.text,
            value: item.value,
          } as any);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: DefaultTheme.DARK_400,
    borderWidth: 2,
    borderColor: DefaultTheme.LIGHT_300,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  placeholder: {
    fontSize: 14,
    color: DefaultTheme.LIGHT_300,
  },
  optionText: {
    fontSize: 14,
    color: DefaultTheme.LIGHT_100,
  },
  option: {
    backgroundColor: DefaultTheme.DARK_400,
  },
});
